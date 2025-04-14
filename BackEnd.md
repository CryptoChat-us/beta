:rocket: Documento de Referência Técnica: Refatoracão Estrutural do Projeto CryptoChat
Este documento apresenta todas as melhorias de arquitetura, código e estrutura sugeridas após auditoria completa do backend do projeto CryptoChat.

✨ Melhorias por Arquivo
InitializeDatabase.java
Ponto
Melhorias Aplicadas
Re-encode Base64
Removido. Evitar reencodar o que já está em UTF-8 claro.
Uso de Date
Substituído por LocalDateTime.
Caminho hardcoded
Usar ClassPathResource ao invés de Paths.get(...).
Try/Catch
Substituir System.out.println por Logger com LoggerFactory.

Objetivo: tornar a leitura de arquivos de prompt mais portável e robusta.

SocketConnectionHandler.java
Ponto
Sugestão
Uso de System.out.println()
Substituir por LoggerFactory.getLogger(...).
Envio para todos os sockets
Ajustar para enviar resposta só para a sessão atual (1:1).
Sem validação de tipo
Verificar se mensagem é do tipo TextMessage.
Sem autenticação
Adicionar HttpSessionHandshakeInterceptor para autenticar.

Exemplo recomendado de envio 1:1:
@Override
public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
    String prompt = message.getPayload().toString();
    String resposta = chamarIA(prompt);
    session.sendMessage(new TextMessage(resposta));
}


WebConfig.java
Elemento
Função
allowedOrigins("*")
INSEGURO em produção. Substituir por https://crypto-chat.com
allowCredentials(false)
Correto se não houver autenticação.

.allowedOrigins("https://crypto-chat.com")


WebSocketConfig.java
registry.addEndpoint("/chat/info")
        .setAllowedOrigins("https://crypto-chat.com")
        .withSockJS();

Definir origem específica protege o servidor contra ataques de domínios externos.

Chat.java
Trocar flgHasPrompt: String para hasPrompt: Boolean


Garantir unicidade de login: @Column(unique = true)


Validar compatibilidade com GenerationType.UUID



Feedback.java
Trocar Date por LocalDateTime


Substituir languageLevel: String por Enum LanguageLevel


Adicionar @Column(nullable = false) no campo login



LogMessage.java
idLogMessage: substituir String por UUID


dateMessage: trocar Date por LocalDateTime


Potencial para filtrar mensagens por usuário e data



Prompts.java ➜ Substituído por PromptTreinamento.java
✅ Nova entidade:
@Entity
@Table(name = "TB_PROMPT_TREINAMENTO")
public class PromptTreinamento {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID idPrompt;
  private String fluxo;
  private String intencao;
  @Lob private String inputUsuario;
  @Lob private String respostaEsperada;
  private String tipoResposta;
  private String tomResposta;
  private String linguagem;
  private boolean geraAcao;
  private boolean contextoGlobal;
  private LocalDateTime dataCriacao;
}

☑️ Vantagens:
Fluxos personalizáveis


Treinamento baseado em contexto


Configuração de tom, linguagem e tipo de resposta


📂 Exemplo de prompts_treinamento.json
{
  "prompts": [
    {
      "fluxo": "Cadastro",
      "intencao": "iniciar conta",
      "inputUsuario": "Quero começar",
      "respostaEsperada": "Claro! Me diga seu nome para começarmos.",
      "tipoResposta": "texto",
      "tomResposta": "amigável",
      "linguagem": "leigo",
      "geraAcao": false,
      "contextoGlobal": false
    }
  ]
}


QuizResult.java
Removido do escopo.


Substituído por PerfilInvestidor.java com intencionalidade clara.


✅ Nova entidade PerfilInvestidor
@Entity
@Table(name = "TB_PERFIL_INVESTIDOR")
public class PerfilInvestidor {
  @Id @GeneratedValue(strategy = GenerationType.UUID)
  private UUID idPerfil;
  private String login;
  private String classificacao;
  private String descricao;
  private String estrategiaSugerida;
  private LocalDateTime dataConclusao;
}

Repositório: PerfilInvestidorRepository com métodos como findTopByLoginOrderByDataConclusaoDesc()

User.java
UUID como chave primária


role, subscriptionPlan, isActive, registerDate


Senha deve ser armazenada com hash seguro (ex: BCrypt)



ChatRepository.java
Se flgHasPrompt vira Boolean, adaptar lógica


Usar Optional<Chat> findByLogin(String login);


Adicionar @Column(unique = true) em Chat.login



FeedbackRepository.java
Usar Optional<Feedback> em findByLogin


Substituir ArrayList por List


Criar métodos de busca por languageLevel, se enum for implementado



LogMessageRepository.java
Tipo de ID: UUID


Uso de LocalDateTime


Sugestão de método adicional:


List<LogMessage> findAllByLoginAndDateMessageBetweenOrderByDateMessageAsc(String login, LocalDateTime start, LocalDateTime end);


PromptTreinamentoRepository.java
public interface PromptTreinamentoRepository extends JpaRepository<PromptTreinamento, UUID> {
  List<PromptTreinamento> findAllByFluxoOrderByDataCriacaoAsc(String fluxo);
  List<PromptTreinamento> findByIntencao(String intencao);
}


UserRepository.java
public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByLogin(String login);
  Optional<User> findByEmail(String email);
}


ChatBotController.java
Problema
Melhorias
@Autowired direto
Usar injeção por construtor
ObjectNode como entrada
Substituir por DTO com @Valid
Tópico fixo
Suporte a tópicos privados no futuro


ChatBotService.java
Problema
Solução
.toString() com JSON
Substituir por .asText()
flgHasPrompt == "S"
Substituir por Boolean
Método gigante
Modularizar montarHistorico, registrarLog etc.


AuthController.java
Problema
Solução
URL com FT003
Usar /auth
Uso de ObjectNode
Substituir por DTOs validados
Tradução via EN
Criar enum de idiomas e fallback


AuthService.java
Substituir criptografia por BCrypt (ou similar)


Métodos claros: registerUser, registerAdmin, authenticateUser


Usar Optional sempre que buscar no repositório



CryptoApiClient.java + CryptoApiService.java
Substituir Feign.builder() por @FeignClient


Evitar uso de Map<String, String> para headers


Exemplo:


@FeignClient(name = "coinGeckoClient", url = "${crypto-chat.url.crypto-gecko}")
public interface CryptoApiClient {
    @GetMapping("/simple/price")
    String callCoinPrice(@RequestParam("ids") String ids, @RequestParam("vs_currencies") String currencies);
}


CryptoPanicService.java / CoinMarketCapService.java
Substituir criação manual por injeção de @FeignClient


Usar @RequestParam, @RequestHeader ao invés de Map



OpenApiClient.java + OpenApiService.java
Instanciar Feign 1x (singleton), não em todo request


Adicionar tratamento de erro robusto


Mover token para env seguro



TranslationController.java
Problema: nome indica tradução, mas executa chamada à CryptoPanic


Separar em dois endpoints diferentes



TranslationService.java
Melhorias
Renomear langDetecString ➔ translateViaAI()
Criar classe de sanitização de resposta da IA
Permitir modelo dinâmico como parâmetro


EncryptionUtils.java
Crítica: gera nova chave AES a cada execução (impossível descriptografar)


Solução: usar chave derivada de string segura e persistente



Utils.java
Problema
Correção
@Autowired com métodos estáticos
Ineficaz, remover
ObjectMapper recriado sempre
Usar instância estática final


application.properties
Item
Problema
CORS
* liberado para todos os domínios (inseguro)
API Keys
Visíveis no código. Usar .env ou secrets vault
Banco de dados
Substituir H2 por PostgreSQL em produção


pom.xml
Remover dependências não utilizadas (ojdbc8, thymeleaf)


Alinhar java.version com versão do projeto (21)