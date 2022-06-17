module.exports = async (i, client) => {
    const { guildId, category } = require("../config.json");
    const guild = client.guilds.cache.get(guildId);
    const channels = await guild.channels.fetch();

    const channel = channels.find(c => c.name === `host-${i.user.id}`);

    if (channel) {
        return await i.reply({ ephemeral: true, content: "Você já está criando um torneio." });
    }

    const host = await guild.channels.create(`host-${i.user.id}`, {
        type: "GUILD_TEXT",
        topic: "Host",
        permissionOverwrites: [
            {
                id: i.guild.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
            },
            {
                id: i.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
            },
            {
                id: client.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
            },
        ]
    });
    await host.setParent(category);
    await i.reply({ ephemeral: true, content: `Você pode criar o seu torneio em ${host}` });

    require("./create")(i, host, client);
}