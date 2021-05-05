const { MessageEmbed } = require('discord.js')

module.exports = {
    aliases: ['cmd'],
    callback: (message, args) => {
      
      
      let HelpEmbed = new MessageEmbed()
      .setTitle('❓ | Commands List')
      .setColor(0xbe0f34)
      .setDescription('`🤖 | Ranking Commands`\n\n`!promote |!pro <username>` - Promote the user rank 1 rank up.\n`!demote |!demo <username>` - Demote the user 1 rank down.\n`⭐️ | Admin Commands`\n\n`!say |!message <messages>` - Send the message with the bot.\n\n**More commands will be adding soon.**\nVersion: `1.0`\nCreator: <@204125386320117760>')
      

      message.channel.send(HelpEmbed)
      
      
    }
  }
  
