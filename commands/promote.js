
module.exports = {
    aliases: ['Promote','Pro','pro'],
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args) => {

        var groupid = process.env.GROUPID
        var rankpermission = process.env.RANKID
        const nbx = require('noblox.js')
        const axios = require('axios')
        const Discord = require('discord.js')
        const hook = new Discord.WebhookClient(process.env.HOOKID, process.env.HOOKTOKEN)

        nbx.setCookie(process.env.COOKIE);

        let GetUserIdFromMessage = async () => {
                let memberid = message.member.id
                let response = await axios.get(`https://api.blox.link/v1/user/${memberid}`)
                let UserId = response.data.primaryAccount
                return UserId   
        }

        let UserIdUseCmds = await GetUserIdFromMessage()

        let GetUsernameFromUseCmds = async () => {
            var response = await nbx.getUsernameFromId(UserIdUseCmds)
            let GetUsernameFromUseCmd = response
            return GetUsernameFromUseCmd
          }


        let GetUserToPromote = async () => {
            var usernametopromote = args[0]
            let response = await nbx.getIdFromUsername(usernametopromote)
            let UserIdToPromoteRun = response
            return UserIdToPromoteRun
          };
      
          
          let UserIdToPromote = await GetUserToPromote()
          let UsernameUseCmds = await GetUsernameFromUseCmds()        

          let FindUserUseCmdRank = async () => {
            let response = await nbx.getRankInGroup(groupid, UserIdUseCmds)
            let FindUserUseCmdRankId = response
            return FindUserUseCmdRankId
          };
      
          let FindUserToPromoteRank = async () => {
            let response = await nbx.getRankInGroup(groupid, UserIdToPromote)
            let FindUserToPromoteRankId = response
            return FindUserToPromoteRankId
          };
      
          let UserRankIdToUseCmd = await FindUserUseCmdRank()
          let UserRankIdToPromote = await FindUserToPromoteRank()

          if (UserIdUseCmds == UserIdToPromote) {
            let FailToRankYourSelf = new Discord.MessageEmbed()
                    .setDescription(`You can not promote yourself.`)
                    .setColor('#e67e22')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(FailToRankYourSelf);
          }
    
          if (UserRankIdToUseCmd <= UserRankIdToPromote) {
            let FailToRankHigher = new Discord.MessageEmbed()
                    .setDescription(`You can not promote users the rank higher than you.`)
                    .setColor('#e67e22')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(FailToRankHigher);
          }
    
          if (UserRankIdToUseCmd > UserIdToPromote || UserRankIdToUseCmd >= rankpermission) {
    
            let PromoteUserInGroup = async () => {
              let response = await nbx.promote(groupid, UserIdToPromote)
              let RankedOnGroup = response
              return RankedOnGroup
            }
    
            await PromoteUserInGroup()
    
            let AfterRanked = async () => {
              let response = await nbx.getRankNameInGroup(groupid, UserIdToPromote)
              let GetRankAfterPromote = response
              return GetRankAfterPromote
            }
    
            let GetRoleInGroup = await AfterRanked()
            console.log(`${UserIdUseCmds} ranked user ${UserIdToPromote} as rank ${GetRoleInGroup}`)
            
            let Promoted = new Discord.MessageEmbed()
                    .setDescription(`Promoted the user ${args[0]} to rank ${GetRoleInGroup}.`)
                    .setColor('#2ecc71')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(Promoted);
    
            let PromotedLogs = new Discord.MessageEmbed()
                    .setDescription(`${UsernameUseCmds} promoted the user ${args[0]} to rank ${GetRoleInGroup}.`)
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    hook.send(PromotedLogs);
        }
    
          else {
            let FailToRankWithoutPermission = new Discord.MessageEmbed()
                    .setDescription(`You do not have permission to use command.`)
                    .setColor('#e67e22')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(FailToRankWithoutPermission);
          }
}

}