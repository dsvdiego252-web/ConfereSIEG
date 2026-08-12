# Auditoria Fiscal SIEG — Etapa 1

Primeira versão para validar a integração com a API SIEG sem expor a chave no HTML.

## O que já faz

- Usa a chave somente no backend da Vercel.
- Testa o endpoint oficial de certificados da SIEG:
  `GET /api/Certificado/ListarCertificados`
- Mostra a resposta da API para validarmos o formato real retornado pela sua conta.
- Já inclui um motor independente para detectar quebra de sequência em documentos normalizados.

## Segurança

NÃO coloque a chave:
- no `index.html`;
- em arquivo enviado ao GitHub;
- em variável JavaScript do navegador.

A chave deve ficar em:
Vercel -> Project -> Settings -> Environment Variables

Crie:

`SIEG_API_KEY` = sua chave da SIEG

Opcionalmente:

`SIEG_EMAIL` = e-mail da conta SIEG, caso a sua integração exija associação por e-mail.

Depois de salvar as variáveis, faça um novo deploy.

## Como publicar

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto.
3. Na Vercel, clique em **Add New -> Project**.
4. Importe o repositório.
5. Abra **Settings -> Environment Variables**.
6. Cadastre `SIEG_API_KEY`.
7. Faça **Redeploy**.
8. Abra o site e clique em **Testar conexão**.

## Próxima ligação técnica

Com a resposta real da sua conta confirmada, o projeto será conectado aos endpoints de download de XML/eventos da SIEG e fará:

- agrupamento por CNPJ + modelo + série;
- sequência de NFC-e modelo 65;
- documentos ausentes;
- eventos de cancelamento;
- contingência pelo `tpEmis`;
- classificação de pendências;
- relatório final para conferência do fechamento.
