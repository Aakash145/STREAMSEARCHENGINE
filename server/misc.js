module.exports = function getIP(req){
    var ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr){
      var list = ipAddr.split(",");
      ipAddr = list[list.length-1];
    } else {
      ipAddr = req.socket.remoteAddress;
    } 
    return ipAddr;
}