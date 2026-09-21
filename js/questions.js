/**
 * Banco de Perguntas sobre LGPD
 * 30 perguntas de multipla escolha (A, B, C, D)
 */

const QUESTIONS = [
    // === CONCEITOS BASICOS (1-8) ===
    {
        id: 1,
        category: "conceito",
        question: "O que e a LGPD?",
        options: [
            "A) Lei Geral de Protecao de Dados pessoais",
            "B) Lei Geral de Privacidade Digital",
            "C) Lei de Gestao de Protecao de Dados",
            "D) Lei Geral de Processamento de Dados"
        ],
        correct: 0,
        explanation: "A LGPD e a Lei Geral de Protecao de Dados Pessoais (Lei nº 13.709/2018), que regulamenta o tratamento de dados pessoais no Brasil."
    },
    {
        id: 2,
        category: "conceito",
        question: "Qual e o principal objetivo da LGPD?",
        options: [
            "A) Aumentar a arrecadacao do governo",
            "B) Proteger os direitos fundamentais de liberdade e privacidade",
            "C) Facilitar o comércio eletronico",
            "D) Regular as redes sociais"
        ],
        correct: 1,
        explanation: "O objetivo principal da LGPD e proteger os direitos fundamentais de liberdade e de intimidade e privacidade dos titulares dos dados."
    },
    {
        id: 3,
        category: "dados",
        question: "O que sao dados pessoais segundo a LGPD?",
        options: [
            "A) Apenas CPF e RG",
            "B) Qualquer informacao relacionada a pessoa natural identificada ou identificavel",
            "C) Dados financeiros exclusivamente",
            "D) Apenas dados eletronicos"
        ],
        correct: 1,
        explanation: "Dado pessoal e toda informacao relacionada a pessoa natural identificada ou identificavel, como nome, CPF, e-mail, endereco, etc."
    },
    {
        id: 4,
        category: "dados",
        question: "Qual e um exemplo de dado sensiveis?",
        options: [
            "A) Nome completo",
            "B) Endereco de e-mail",
            "C) Dados referentes a saude ou orientacao sexual",
            "D) Numero de telefone"
        ],
        correct: 2,
        explanation: "Dados sensiveis incluem dados pessoais sobre origem racial, conviccao religiosa, opcao sexual, dado genetico, biométrico, entre outros."
    },
    {
        id: 5,
        category: "conceito",
        question: "Quem e o titular dos dados pessoais?",
        options: [
            "A) A empresa que armazena os dados",
            "B) O programador que criou o sistema",
            "C) A pessoa natural a quem se referem os dados",
            "D) O governo fiscalizador"
        ],
        correct: 2,
        explanation: "O titular e a pessoa natural (pessoa fisica) a quem se referem os dados pessoais que sao objeto de tratamento."
    },
    {
        id: 6,
        category: "principios",
        question: "Qual e o principio da finalidade na LGPD?",
        options: [
            "A) Dados podem ser usados para qualquer finalidade",
            "B) O tratamento deve ser feito para propostas legitimas e especificas",
            "C) Finalidade e opcional no tratamento",
            "D) Finalidade se aplica apenas a dados sensiveis"
        ],
        correct: 1,
        explanation: "O principio da finalidade determina que o tratamento deve ser feito para propostas legitimas e especificas, sem tratamento compativel com essas finalidades."
    },
    {
        id: 7,
        category: "principios",
        question: "O que e o principio da necessidade?",
        options: [
            "A) Coletar o maximo de dados possivel",
            "B) Limitar o tratamento ao minimo necessario para cada finalidade",
            "C) Manter dados para sempre",
            "D) Compartilhar dados com todas as empresas"
        ],
        correct: 1,
        explanation: "O principio da necessidade limita o tratamento de dados ao minimo necessario para a finalidade pretendida."
    },
    {
        id: 8,
        category: "conceito",
        question: "Quando a LGPD entrou em vigor?",
        options: [
            "A) 2016",
            "B) 2017",
            "C) 2018",
            "D) 2020"
        ],
        correct: 2,
        explanation: "A LGPD foi sancionada em 14 de agosto de 2018 e entrou em vigor em setembro de 2020."
    },

    // === DIREITOS DOS TITULARES (9-14) ===
    {
        id: 9,
        category: "direitos",
        question: "Qual e o direito de acesso do titular?",
        options: [
            "A) Acesso gratuito a internet",
            "B) Direito de obter informacoes sobre o tratamento de seus dados",
            "C) Acesso a sistemas da empresa",
            "D) Direito de acessar dados de outros titulares"
        ],
        correct: 1,
        explanation: "O direito de acesso permite ao titular obter informacoes sobre a existencia de tratamento de seus dados e o acesso aos dados tratados."
    },
    {
        id: 10,
        category: "direitos",
        question: "O que e o direito de portabilidade?",
        options: [
            "A) Transportar dados fisicamente",
            "B) Direito de transferir dados para outro fornecedor de servico",
            "C) Portar dados em pen drives",
            "D) Direito de mudar de empresa"
        ],
        correct: 1,
        explanation: "O direito de portabilidade permite que o titular solicite a transferencia de seus dados para outro fornecedor de servico."
    },
    {
        id: 11,
        category: "direitos",
        question: "Qual e o prazo para o controlador atender solicitacao do titular?",
        options: [
            "A) 5 dias uteis",
            "B) 15 dias uteis",
            "C) 30 dias corridos",
            "D) 60 dias corridos"
        ],
        correct: 1,
        explanation: "O controlador deve atender as solicitacoes do titular em prazo de ate 15 dias uteis a partir da data da solicitacao."
    },
    {
        id: 12,
        category: "direitos",
        question: "O que e o direito de exclusao (esquecimento)?",
        options: [
            "A) Deletar contas de redes sociais",
            "B) Direito de solicitar a eliminacao de dados tratados com consentimento",
            "C) Apagar dados de backup",
            "D) Excluir apenas dados financeiros"
        ],
        correct: 1,
        explanation: "O direito de exclusao permite ao titular solicitar a eliminacao de dados tratados com base em seu consentimento."
    },
    {
        id: 13,
        category: "direitos",
        question: "O titular pode se opor ao tratamento de dados em qual situacao?",
        options: [
            "A) Em qualquer situacao",
            "B) Apenas quando dados sensiveis sao tratados",
            "C) Quando o tratamento nao for compativel com a finalidade informada",
            "D) Apenas em caso de fraude"
        ],
        correct: 2,
        explanation: "O titular pode se opor quando o tratamento nao for compativel com as finalidades informadas ou quando nao houver consentimento."
    },
    {
        id: 14,
        category: "direitos",
        question: "Qual direito permite ao titular corrigir dados incompletos?",
        options: [
            "A) Direito de acesso",
            "B) Direito de retificacao",
            "C) Direito de portabilidade",
            "D) Direito de oposicao"
        ],
        correct: 1,
        explanation: "O direito de retificacao permite ao titular solicitar a correcao de dados incompletos, inexatos ou desatualizados."
    },

    // === BASES LEGAIS (15-19) ===
    {
        id: 15,
        category: "bases",
        question: "O que e consentimento como base legal?",
        options: [
            "A) Autorizacao do titular para tratamento de dados",
            "B) Obrigatoriedade legal da empresa",
            "C) Interesse comercial da empresa",
            "D) Decisao do governo"
        ],
        correct: 0,
        explanation: "Consentimento e a manifestacao livre, informada e inequivoca do titular concordando com o tratamento de seus dados."
    },
    {
        id: 16,
        category: "bases",
        question: "Quando se aplica o legitimo interesse?",
        options: [
            "A) Sempre que a empresa quiser",
            "B) Quando e necessario para fins legitimos e nao afeta direitos do titular",
            "C) Apenas para dados sensiveis",
            "D) Exclusivamente para governos"
        ],
        correct: 1,
        explanation: "O legitimo interesse se aplica quando e necessario para fins legitimos da empresa e nao afeta os direitos e liberdades do titular."
    },
    {
        id: 17,
        category: "bases",
        question: "Qual e uma base legal para tratamento de dados?",
        options: [
            "A) Apenas consentimento",
            "B) Consentimento, obrigacao legal, execucao de contrato, entre outras",
            "C) Apenas obrigatoriedade legal",
            "D) Nenhuma das anteriores"
        ],
        correct: 1,
        explanation: "A LGPD prevê 10 bases legais, incluindo consentimento, obrigacao legal, execucao de contrato, legitimo interesse, entre outras."
    },
    {
        id: 18,
        category: "bases",
        question: "Para dados sensiveis, qual e a regra geral sobre consentimento?",
        options: [
            "A) Consentimento nao e necessario",
            "B) Consentimento especifico e destacado e obrigatorio",
            "C) Consentimento verbal basta",
            "D) Consentimento e opcional"
        ],
        correct: 1,
        explanation: "Para dados sensiveis, e necessario consentimento especifico e destacado do titular, salvo nas excecoes previstas na lei."
    },
    {
        id: 19,
        category: "bases",
        question: "A execucao de contrato e uma base legal valida?",
        options: [
            "A) Nao, nunca e valida",
            "B) Sim, quando o tratamento e necessario para executar um contrato",
            "C) Apenas para contratos digitais",
            "D) Apenas para contratos de trabalho"
        ],
        correct: 1,
        explanation: "A execucao de contrato e uma base legal valida quando o tratamento e necessario para cumprir obrigacoes contratuais."
    },

    // === PUNICOES E MULTAS (20-24) ===
    {
        id: 20,
        category: "punicoes",
        question: "Qual e o valor maximo da multa por infracao a LGPD?",
        options: [
            "A) 1% do faturamento",
            "B) 2% do faturamento, limitado a R$ 50 mil por infracao",
            "C) 5% do faturamento",
            "D) 10% do faturamento"
        ],
        correct: 1,
        explanation: "A multa e de ate 2% do faturamento da empresa, limitada a R$ 50.000.000,00 por infracao."
    },
    {
        id: 21,
        category: "punicoes",
        question: "Quais sao os tipos de sancao administrativa da ANPD?",
        options: [
            "A) Apenas multa",
            "B) Multa, advertiao, publicizacao da infracao, bloqueio e eliminacao de dados",
            "C) Apenas prisao",
            "D) Apenas fechamento da empresa"
        ],
        correct: 1,
        explanation: "As sancoes incluem: advertiao, multa simples de ate 2% do faturamento, multa diaria, publicizacao da infracao, bloqueio e eliminacao de dados."
    },
    {
        id: 22,
        category: "punicoes",
        question: "A LGPD preve penalidades criminais?",
        options: [
            "A) Nao, apenas administrativas",
            "B) Sim, em alguns casos especificos previstos no Codigo Penal",
            "C) Sim, para todas as infracoes",
            "D) Apenas para empresas estrangeiras"
        ],
        correct: 1,
        explanation: "Embora a LGPD seja uma lei administrativa, alguns comportamentos podem configurar crimes previstos no Codigo Penal."
    },
    {
        id: 23,
        category: "punicoes",
        question: "O que e a publicizacao da infracao?",
        options: [
            "A) Divulgacao obrigatoria da empresa infratora",
            "B) Apenas notificacao interna",
            "C) Publicacao em jornal exclusivo",
            "D) Aviso aos funcionarios"
        ],
        correct: 0,
        explanation: "A publicizacao e a divulgacao publica da infracao apos confirmada pela ANPD e devidamente apurada."
    },
    {
        id: 24,
        category: "punicoes",
        question: "A multa diaria da LGPD serve para:",
        options: [
            "A) Punir o titular dos dados",
            "B) Coagir o infrator a cessar a conduta infratora",
            "C) Financiar a ANPD",
            "D) Pagamento de advogados"
        ],
        correct: 1,
        explanation: "A multa diaria tem finalidade coercitiva, visando obrigar o infrator a parar com a pratica irregular."
    },

    // === PAPEIS E RESPONSABILIDADES (25-27) ===
    {
        id: 25,
        category: "papeis",
        question: "Quem e o DPO (Encarregado de Dados)?",
        options: [
            "A) O dono da empresa",
            "B) Pessoa responsavel por receber comunicacoes da ANPD e dos titulares",
            "C) O programador do sistema",
            "D) O advogado da empresa"
        ],
        correct: 1,
        explanation: "O DPO (Encarregado) e a pessoa indicada para atuar como canal de comunicacao entre o controlador, os titulares e a ANPD."
    },
    {
        id: 26,
        category: "papeis",
        question: "Qual e a diferenca entre controlador e operador?",
        options: [
            "A) Nao ha diferenca",
            "B) Controlador decide sobre o tratamento; operador executa o tratamento",
            "C) Operador decide; controlador executa",
            "D) Ambos sao obrigatoriamente a mesma pessoa"
        ],
        correct: 1,
        explanation: "O controlador e quem toma as decisoes sobre o tratamento de dados. O operador e quem executa o tratamento em nome do controlador."
    },
    {
        id: 27,
        category: "papeis",
        question: "Quando e obrigatorio nomear um DPO?",
        options: [
            "A) Apenas para empresas grandes",
            "B) Quando a atividade principal envolve tratamento de dados em larga escala ou dados sensiveis",
            "C) Apenas para empresas publicas",
            "D) Nunca e obrigatorio"
        ],
        correct: 1,
        explanation: "A nomeacao e obrigatoria quando o controlador realizar operacoes de tratamento de dados que requerem monitoramento regular e sistematico de titulares em larga escala."
    },

    // === TRATAMENTO E SEGURANCA (28-30) ===
    {
        id: 28,
        category: "tratamento",
        question: "O que e tratamento de dados pessoais?",
        options: [
            "A) Apenas armazenamento de dados",
            "B) Qualquer operacao realizada com dados pessoais (coleta, uso, armazenamento, etc.)",
            "C) Apenas exclusao de dados",
            "D) Apenas compartilhamento de dados"
        ],
        correct: 1,
        explanation: "Tratamento e qualquer operacao realizada com dados pessoais, incluindo coleta, producao, recepcao, classificacao, utilizacao, acesso, reproducao, entre outras."
    },
    {
        id: 29,
        category: "seguranca",
        question: "Qual e uma medida de seguranca exigida pela LGPD?",
        options: [
            "A) Apenas antivirus",
            "B) Medidas tecnicas e administrativas aptas a proteger dados pessoais",
            "C) Apenas firewall",
            "D) Apenas backup"
        ],
        correct: 1,
        explanation: "A LGPD exige medidas tecnicas e administrativas de seguranca aptas a proteger os dados pessoais de acessos nao autorizados e de situacoes acidentais ou ilicitas."
    },
    {
        id: 30,
        category: "incidentes",
        question: "O que e um incidente de seguranca segundo a LGPD?",
        options: [
            "A) Apenas ataques de hackers",
            "B) Qualquer evento que comprometa a seguranca dos dados tratados",
            "C) Apenas queda de sistema",
            "D) Apenas roubo de equipamentos"
        ],
        correct: 1,
        explanation: "Incidente de seguranca e qualquer evento que comprometa a confidencialidade, integridade ou disponibilidade dos dados tratados."
    }
];

// Eventos aleatorios para casas amarelas
const EVENTS = [
    {
        icon: "&#128161;",
        text: "Sua empresa passou por uma auditoria de conformidade e foi aprovada!",
        points: 20,
        positive: true
    },
    {
        icon: "&#128274;",
        text: "Voce implementou criptografia em todos os dados sensiveis!",
        points: 15,
        positive: true
    },
    {
        icon: "&#128640;",
        text: "Treinamento de seguranca realizado com sucesso com todos os funcionarios!",
        points: 15,
        positive: true
    },
    {
        icon: "&#128200;",
        text: "Sua politica de privacidade foi elogiada pela ANPD!",
        points: 20,
        positive: true
    },
    {
        icon: "&#128272;",
        text: "Voce nomeou um DPO competente para a empresa!",
        points: 10,
        positive: true
    },
    {
        icon: "&#9888;&#65039;",
        text: "Vazamento de dados por falta de criptografia! A ANPD aplicou uma multa.",
        points: -15,
        positive: false
    },
    {
        icon: "&#128680;",
        text: "Dados de clientes foram compartilhados sem consentimento!",
        points: -20,
        positive: false
    },
    {
        icon: "&#128176;",
        text: "Multa por nao atender solicitacao do titular dentro do prazo!",
        points: -10,
        positive: false
    },
    {
        icon: "&#128274;",
        text: "Sistema de seguranca comprometido! Dados em risco.",
        points: -15,
        positive: false
    },
    {
        icon: "&#9888;&#65039;",
        text: "Campanha de phishing atingiu funcionarios da empresa!",
        points: -10,
        positive: false
    },
    {
        icon: "&#127775;",
        text: "Parabens! Sua empresa ganhou um premio de boas praticas em protecao de dados!",
        points: 25,
        positive: true
    },
    {
        icon: "&#128203;",
        text: "Documentacao de processos atualizada e organizada!",
        points: 10,
        positive: true
    }
];
