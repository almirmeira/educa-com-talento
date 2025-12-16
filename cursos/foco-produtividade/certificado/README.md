# Certificado de Conclusão

Modelo de certificado para cursos do Educa com Talento.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `certificado-conclusao.svg` | Template visual em SVG (editável) |
| `certificado-conclusao.html` | Versão HTML para visualização e impressão |

## Campos Variáveis

O certificado usa campos que serão preenchidos automaticamente pelo Moodle:

| Campo | Descrição |
|-------|-----------|
| `{NOME_COMPLETO}` | Nome completo do participante |
| `{DATA_CONCLUSAO}` | Data de conclusão do curso (DD/MM/AAAA) |
| `{CODIGO_VERIFICACAO}` | Código único para verificação de autenticidade |
| `{CERTIFICADO_ID}` | ID do certificado no sistema |

## Especificações

- **Formato**: A4 Paisagem (297mm x 210mm)
- **Carga Horária**: 30 horas
- **Modalidade**: Online
- **Validação**: Rosangela Sousa (Diretora Pedagógica) e Almir Meira Alves (Diretor Executivo)

## Configuração no Moodle

O certificado é gerado pelo plugin **Custom Certificate** (mod_customcert).

### Requisitos para obter o certificado:
1. Concluir todas as 30 aulas
2. Realizar todas as atividades práticas
3. Enviar os entregáveis de cada aula
4. Obter nota mínima de 60% nas atividades

### Elementos do template:
- Borda decorativa com gradiente roxo
- Logo do Educa com Talento
- Título "CERTIFICADO de Conclusão"
- Nome do participante (dinâmico)
- Nome do curso (dinâmico)
- Data de conclusão (dinâmico)
- Assinaturas dos diretores
- Código de verificação (dinâmico)
- QR Code para verificação online

## Verificação

Certificados podem ser verificados em: `educacomtalento.com.br/verificar`

## Cores do Template

| Elemento | Cor |
|----------|-----|
| Gradiente principal | `#667eea` → `#764ba2` |
| Dourado decorativo | `#f5af19` → `#f7d354` |
| Texto título | `#667eea` |
| Texto subtítulo | `#764ba2` |
| Texto corpo | `#333333` / `#555555` |
| Texto secundário | `#666666` / `#888888` |

## Fontes

- **Títulos**: Georgia, Playfair Display
- **Corpo**: Arial, Open Sans
- **Código**: Courier, monospace

---

Educa com Talento • Transformando Potencial em Excelência
