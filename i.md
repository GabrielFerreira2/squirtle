1. Silph link 💬 (checkar se o usuario envia um link)
2. Link da comunidade 💬 (checkar se o usuario envia um link)
3. Cup name 💬 (mensagem livre)
4. Meta 🎫
5. Ranked / non-ranked 🎫
6. On-site / remote (Se for a opção on-site, peça o link de localização do google) 🎫
7. Starting time (Date & time) aquela dependencia do tempo que falei pra vc
8. Prize money (Opção sim/não, se pressionar sim, então tem que escrever o valor (mensagem e so aceita numero)) 🎫
9. Time per round format: 🎫 

Legenda:
-  💬 é pq é por mensagem livre
-  🎫 é por menub



e o script vai tar na index
quando o usario clica no botao
o bot cria um canal
e vai pedir ao usuario 9 informações
algumas das informaçoes vao ser para escolher uma das opçoes no menu
outras informaçoes vao ser para escrever uma mensagem livre
no final das 9 informaçoes o bot envia essas 9 informaçoes para um outro canal

        {
            "name": "Sylph link",
            "type": "url"
        },
        {
            "name": "Link da comunidade",
            "type": "url"
        },
        {
            "name": "Cup name",
            "type": "text"
        },
        {
            "name": "Meta",
            "type": "menu",
            "customId": "meta",
            "options": [
                {
                    "label": "Great League",
                    "description": "",
                    "emoji": "",
                    "value": "Great League"
                },
                {
                    "label": "Ultra League",
                    "description": "",
                    "emoji": "",
                    "value": "Ultra League"
                },
                {
                    "label": "Master League",
                    "description": "",
                    "emoji": "",
                    "value": "Master League"
                }
            ]
        },
        {
            "name": "Ranked",
            "type": "menu",
            "customId": "ranked",
            "options": [
                {
                    "label": "Ranked",
                    "description": "PAG",
                    "emoji": "🏆",
                    "value": "Ranked"
                },
                {
                    "label": "Non-ranked",
                    "description": "PAG",
                    "emoji": "📌",
                    "value": "Non-ranked"
                }
            ]
        },
        {
            "name": "On-site/Remote",
            "type": "menu",
            "customId": "onsite",
            "options": [
                {
                "label": "On-site",
                "description": "PAG",
                "emoji": "👤",
                "value": "On-site"
                },
                {
                "label": "Remote",
                "description": "PAG",
                "emoji": "🌐",
                "value": "Remote"
                }
            ]
        },
        {
            "name": "Link de localização do google",
            "type": "url",
            "conditional": true,
            "condition": "answers.find(a => a.name === \"On-site/Remote\").value === \"On-site\""
        },