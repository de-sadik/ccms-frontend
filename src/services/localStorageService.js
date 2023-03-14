export const localStrorageService = {
setAccessToken,
getAccessToken,
storeReciviedData
}

function setAccessToken(token){
    localStorage.setItem('access-token',token)
}
function getAccessToken(){
    return localStorage.getItem('access-token')
}
function storeReciviedData(data){
    localStrorageService.setItem('data', JSON.parse(data))
} 