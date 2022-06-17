module.exports = {
    name: "create",
    description: "",
    execute: async ({ message, args, client }) => {
        const { MessageEmbed } = require("discord.js");
        const { guildId } = require("../config.json");

        const guild = client.guilds.cache.get(guildId);
        const channel = args[0];

        const channels = await guild.channels.fetch();
        if (!channels.has(channel)) {
            return await message.reply("Canal não encontrado. Verifique o ID e tente novamente");
        }

        const embed = new MessageEmbed().setTimestamp(Date.now()).setTitle("Torneio").setDescription("\u200B");

        channels.get(channel).send({
            embeds: [embed], "components": [
                {
                    "type": 1,
                    "components": [
                        {
                            "style": 1,
                            "label": `Criar torneio`,
                            "custom_id": `create`,
                            "disabled": false,
                            "type": 2
                        }
                    ]
                }
            ]
        });

    }

}