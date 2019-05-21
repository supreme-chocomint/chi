function clearTransferBox(){document.getElementById("transfer-box").value=""}function disableFollowing(){let a=window.currentDisplay.vaTable;a.style.display="",window.currentDisplay.followTable.style.display="none",document.getElementById("left-table-switch").disabled=!0}function toggleFollow(a){return following=getFollowing(),{}==following?(follow(a),getBlackStar()):a.id in following?(unfollow(a),getWhiteStar()):(follow(a),getBlackStar())}function follow(a){let b=getFollowing();b[a.id]=!0,localStorage.setItem("following",JSON.stringify(b)),addFollowTableEntry(a)}function unfollow(a){allFollowing=getFollowing(),delete allFollowing[a.id],localStorage.setItem("following",JSON.stringify(allFollowing)),removeFollowTableEntry(a.id)}function addFollowTableEntry(a){window.currentDisplay.addFollowTableEntry(a)}function removeFollowTableEntry(a){let b=window.currentDisplay.followTableBody;for(let c of b.children)if(c.id==a){b.removeChild(c),b.setAttribute("data-changed",!0);break}}function getBlackStar(){return"<i class='fas fa-star'></i>"}function getWhiteStar(){return"<i class='far fa-star'></i>"}function getDeleteIcon(){return"<i class='fas fa-times'></i>"}function importButtonOnClick(){let a=document.getElementById("transfer-box").value,b=window.currentDisplay.followTableBody,c=window.confirm("Importing will replace all existing follows. Are you sure?");c&&(isJson(a)?(localStorage.setItem("following",a),b.innerHTML="",populateFollowTable(),b.setAttribute("data-changed",!0)):window.alert("Import data invalid. No changes made to existing follows."))}function exportButtonOnClick(){let a=document.getElementById("transfer-box");a.value=JSON.stringify(getFollowing())}function isFollowed(a){try{let b=getFollowing();if(b)return!!b[a];if({}==b)return!1}catch(a){return!1}}function getFollowing(){let a=JSON.parse(localStorage.getItem("following"));return a?a:{}}function populateFollowTable(){let a=getFollowing(),b=Object.keys(a);window.currentDisplay.clearFollowTable();let c=function(a){let b=a.errors[0].status,c=document.createElement("span");window.currentDisplay.followTableBody.appendChild(c),console.log(a),window.importErrors?indow.importErrors++:window.importErrors=1};for(let a of b){makeRequest(getQuery("VA ID"),{id:a},function(a){collectFollowingCallback(b.length,a)},c)}}function collectFollowingCallback(a,b){let c=b.data.Staff,d={id:c.id,name:parsedName(c.name),url:c.siteUrl,image:c.image.large,language:c.language};addFollowTableEntry(d),window.voiceActors[c.id]==null&&(window.voiceActors[c.id]=d);let e=window.currentDisplay.followTableBody.children.length;e==a&&(window.importErrors!=null&&0!=window.importErrors&&(window.alert(`Failed to import ${window.importErrors} voice actors; no response from AniList`),window.importErrors=0),unlock())}