

module.exports = {
    aliases: ['say','Say'],
    permissions: ['ADMINISTRATOR'],
    callback: (message, args) => {
      var Notice = args.join(" ")
      var MemberId = message.member.id
      message.channel.send(`${Notice}\n\n> Message from <@${MemberId}>.`)
      message.delete(message)
      
    }
  }
  