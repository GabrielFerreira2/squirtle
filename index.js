const { Client, Collection, Intents } = require("discord.js");
const fs = require('fs');
const { prefix, button, final, guildId } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", async (c) => {
    const guild = client.guilds.cache.get(guildId);
    const channels = await guild.channels.fetch();

    if (!channels.has(button.channel) || !channels.has(final.channel)) {
        console.error("Something went wrong...");
        client.destroy();
        process.exit();
    }

    const collector = await channels.get(button.channel).createMessageComponentCollector();

    collector.on("collect", i => {
        require("./modules/collect")(i, client);
    })

    console.log("READY")
});

client.on("messageCreate", (m) => {
    if (!m.content.startsWith(prefix) || m.author.bot) return;

    const args = m.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute({message: m, args, client})
    } catch (e) {
        console.error("e");
    }
});

client.login("Nzk5NDQxMTQ2NDg4NTUzNDcz.G3RQVV.fESnCBcENqP6S5EdFqfwqRNzdzlXfQdH1Hh3lw");