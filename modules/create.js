module.exports = async (interaction, channel, client) => {
    const { MessageActionRow, MessageSelectMenu, InviteGuild } = require("discord.js")
    const { emojis, questions } = require("../config.json");
    const dayjs = require("dayjs");
    let s = "";
    let answers = []


    for (q of questions) {
        if (!q.conditional) {
            s += `${q.name} ${emojis.incomplete}\n`
        }
    }

    const info = await channel.send({
        "embeds": [
            {
                "type": "rich",
                "title": `Info`,
                "description": s,
                "color": 0x00FFFF
            }
        ]
    });

    let message;
    for (let q of questions) {
        let p;
        let collector;

        if ((q.conditional === true && eval(q.condition)) || !q.conditional) {
            if (q.type === "url") {

                if (!message) {
                    message = await channel.send({ content: q.name, components: [] });
                } else {
                    await message.edit({ content: q.name, components: [] });
                }
                const filter = m => m.author.id === interaction.user.id && !m.author.bot;
                collector = channel.createMessageCollector({ time: 20000, filter });

                p = new Promise((resolve, reject) => {
                    collector.on("collect", m => {
                        if (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(m.content)) {
                            answers.push({ name: q.name, value: m.content });
                            resolve(m);
                            collector.stop();
                        }
                        m.delete();
                    })
                })

            }
            if (q.type === "menu") {
                let row = new MessageActionRow();
                const menu = new MessageSelectMenu().setCustomId(q.customId).setPlaceholder(q.name).addOptions(q.options);
                row.addComponents(menu);

                if (!message) {
                    message = await channel.send({ content: q.name, components: [row] });
                } else {
                    await message.edit({ content: q.name, components: [row] });
                }

                const filter = i => i.user.id === interaction.user.id && !i.user.bot;
                collector = channel.createMessageComponentCollector({ time: 20000, filter });
                p = new Promise((resolve, reject) => {
                    collector.on("collect", i => {
                        answers.push({ name: q.name, value: i.values[0] });
                        resolve(i);
                    })
                })
            }
            if (q.type === "text") {

                if (!message) {
                    message = await channel.send({ content: q.name, components: [] });
                } else {
                    await message.edit({ content: q.name, components: [] });
                }
                const filter = m => m.author.id === interaction.user.id && !m.author.bot;
                collector = channel.createMessageCollector({ time: 20000, filter });

                p = new Promise((resolve, reject) => {
                    collector.on("collect", m => {
                        answers.push({ name: q.name, value: m.content });
                        resolve(m);
                        collector.stop();
                        m.delete();
                    })
                })

            }
            if (q.type === "date") {
                if (!message) {
                    message = await channel.send({ content: q.name, components: [] });
                } else {
                    await message.edit({ content: q.name, components: [] });
                }
                const filter = m => m.author.id === interaction.user.id && !m.author.bot;
                collector = channel.createMessageCollector({ time: 60000, filter });

                p = new Promise((resolve, reject) => {
                    collector.on("collect", m => {
                        console.log(dayjs(m.content, "DD/MM/YYYY HH:mm").isValid())
                        answers.push(m.content)
                        resolve(m);
                        collector.stop();
                        m.delete();
                    })
                })
            }
        }




        await p;
    }
    console.log(answers);
}

/*
let row = new MessageActionRow();
const menu = new  MessageSelectMenu().setCustomId(q.customId).setPlaceholder(q.name).addOptions(q.options);
row.addComponents(menu)
*/