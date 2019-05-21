function displayModeSwitchOnClick(){let a=window.location.href.split("#")[0],b=window.location.hash,c=a.split("?");switch(c[1]){case"grid":window.location.replace(c[0]+"?minimalist"+b);break;case"minimalist":window.location.replace(c[0]+"?grid"+b);}}function buildDisplayModes(){let a=document.getElementById("display-mode-switch");for(let a of Object.values(window.displayModes))a.init();switch(window.currentDisplay.activate(),window.currentDisplay.name){case"grid":a.value="Minimalist Mode";break;case"minimalist":a.value="Grid Mode";}}var Grid={name:"grid",tablePageSize:6,init(){this.vaTable=document.querySelector(".grid.va-table"),this.vaTableBody=document.querySelector(".grid.va-table-body"),this.followTable=document.querySelector(".grid.follow-table"),this.followTableBody=document.querySelector(".grid.follow-table-body"),this.rolesTable=document.querySelector(".grid.roles-table"),this.rolesTableBody=document.querySelector(".grid.roles-table-body"),this.vaTableHeader=document.getElementById("va-table-header"),this.rolesTableHeader=document.getElementById("roles-table-header"),this.vaPopularTableBody=document.querySelector(".grid.va-popular-characters-body"),this.vaUWTableBody=document.querySelector(".grid.va-uw-characters-body"),this.vaMainTableBody=document.querySelector(".grid.va-main-characters-body"),this.vaSupportTableBody=document.querySelector(".grid.va-support-characters-body"),this.searchTableBody=this.vaTableBody,this.characterBrowseTableBody=this.vaTableBody,this.vaLanguageTable=document.querySelector(".grid.va-language-table"),this.vaLanguageTableBody=document.querySelector(".grid.va-language-table-body"),this.vaLanguageTableHeader=document.getElementById("va-language-table-header")},activate(){document.getElementById("va-left-container").classList.add("grid"),document.getElementById("va-right-container").classList.add("grid"),document.getElementById("va-bottom-container").classList.add("grid"),document.getElementById("left-col").classList.add("grid"),document.getElementById("right-col").classList.add("grid");let a=document.querySelectorAll(".static-display-top");for(let b of a)b.classList.contains("grid")&&(b.style.display="")},addFollowTableEntry(a){let b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("p"),e=document.createElement("a"),f=document.createElement("a"),g=document.createElement("div"),h=document.createElement("span");b.id=a.id,c.style.backgroundImage=`url(${a.image})`,c.classList.add("thumbnail"),h.innerHTML=getDeleteIcon(),h.classList.add("thumbnail-icon"),g.onclick=function(){unfollow(a)},g.classList.add("thumbnail-icon-wrapper"),g.appendChild(h),c.appendChild(g),b.appendChild(c),e.innerHTML=a.name,e.classList.add("clickable"),e.onclick=function(){VADetailsOnClick(a.id)},d.appendChild(e),d.appendChild(document.createElement("br")),f.classList.add("clickable"),f.innerHTML+="Show Roles",f.classList.add("internal_link"),f.onclick=function(){VAOnClick(a.id)},d.appendChild(f),d.appendChild(document.createElement("br")),d.classList.add("thumbnail-caption"),b.appendChild(d),b.classList.add("thumbnail-wrapper"),this.followTableBody.appendChild(b),this.followTableBody.lastChild.style.width=window.getComputedStyle(c).width},clearFollowTable(){this.followTableBody.innerHTML=""},addNoResultsIndicator(a,b){let c=document.createElement("p");c.classList.add("grid-table-message"),c.innerHTML="Nothing found :(","va-table-body"==a?this.vaTableBody.appendChild(c):"roles-table-body"==a?this.rolesTableBody.appendChild(c):"media-search-table-body"==a?this.searchTableBody.appendChild(c):"character-browse-table-body"==a?this.characterBrowseTableBody.appendChild(c):"va-language-table-body"==a&&(c.innerHTML+="<br>"+b,this.vaLanguageTableBody.appendChild(c))},addVATableEntry(a){let b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("p"),e=document.createElement("a"),f=document.createElement("a"),g=document.createElement("div"),h=document.createElement("span");b.id=a.id,c.style.backgroundImage=`url(${a.image})`,c.classList.add("thumbnail"),h.innerHTML=isFollowed(a.id)?getBlackStar():getWhiteStar(),h.classList.add("thumbnail-icon"),g.onclick=function(){h.innerHTML=toggleFollow(a)},g.classList.add("thumbnail-icon-wrapper"),g.appendChild(h),c.appendChild(g),b.appendChild(c),e.innerHTML=a.name,e.classList.add("clickable"),e.onclick=function(){VADetailsOnClick(a.id)},d.appendChild(e),d.appendChild(document.createElement("br")),numRolesInt=window.seasonalRolesCounter[a.id],f.innerHTML=numRolesInt?`Roles: ${numRolesInt}`:"Show Roles",f.classList.add("clickable"),f.classList.add("internal_link"),f.onclick=function(){VAOnClick(a.id)},d.appendChild(f),d.appendChild(document.createElement("br")),d.classList.add("thumbnail-caption"),b.classList.add("thumbnail-wrapper"),b.classList.add(a.language),b.appendChild(d),this.vaTableBody.appendChild(b),this.vaTableBody.lastChild.style.width=window.getComputedStyle(c).width},styleVATable(a){let b,c=this.vaTableBody.children.length,d=this.tablePageSize-c%this.tablePageSize,e=Math.ceil((c-1)/this.tablePageSize),f=0,g=[];if(this.vaTableBody.style.height="",0==c)return void this.addNoResultsIndicator("va-table-body");if(!1!=a){for(let a of this.vaTableBody.children)a.clientHeight>f&&(f=a.clientHeight,b=a);for(let a=0;a<d+this.tablePageSize;a++)g.push(b.cloneNode(!0)),g[a].id=`clone${a}`,this.vaTableBody.appendChild(g[a]);this.vaTableBody.style.visibility="hidden",setNavigationState(this.vaTableBody,this.tablePageSize,"ALL"),switchToPage(e,"ALL"),this.vaTableBody.style.height=this.vaTableBody.clientHeight+"px",this.vaTableBody.style.visibility="",switchToPage(0,"ALL");for(let a of g)this.vaTableBody.removeChild(a)}},setVATableHeader(a){if(""==a)this.vaTable.style.display="none",this.vaTableHeader.innerHTML=a;else{this.vaTable.style.display="";let b=a.trim();b=b[0].toUpperCase()+b.slice(1),this.vaTableHeader.innerHTML=b}},addRolesTableEntry(a){let b={character:{name:a.characterName,image:a.characterImage.large,url:a.characterUrl},show:{title:{romaji:a.showName},siteUrl:a.showUrl}};addCharacterEntry("roles-table-body",b)},setRolesTableHeader(a){if(""==a)this.rolesTable.style.display="none",this.rolesTableHeader.innerHTML=a;else{this.rolesTable.style.display="";let b=a.trim();b=b[0].toUpperCase()+b.slice(1),this.rolesTableHeader.innerHTML=b}},addCharacterEntry(a,b,c){let d=b.character,e=b.show,f=this.getCharacterContainer(a),g=document.createElement("div"),h=document.createElement("div"),i=document.createElement("p"),j=document.createElement("a"),k=document.createElement("a");h.style.backgroundImage=`url(${d.image})`,h.classList.add("thumbnail"),c&&(h.classList.add("clickable"),h.onclick=c),g.appendChild(h),j.href=d.url,j.target="_blank",j.innerHTML=d.name,j.style.fontWeight="bold",i.appendChild(j),i.innerHTML+="<br>",e&&(k.href=e.siteUrl,k.target="_blank",k.innerHTML=e.title.romaji,i.appendChild(k)),i.classList.add("thumbnail-caption"),g.appendChild(i),g.classList.add("thumbnail-wrapper"),f.appendChild(g),f.lastChild.style.width=window.getComputedStyle(h).width},getCharacterContainer(a){return"va-popular-characters"===a?this.vaPopularTableBody:"va-uw-characters"===a?this.vaUWTableBody:"va-main-characters"===a?this.vaMainTableBody:"va-support-characters"===a?this.vaSupportTableBody:"roles-table-body"===a?this.rolesTableBody:"character-browse-table-body"===a?this.characterBrowseTableBody:void 0},clearSideContainers(){this.vaPopularTableBody.innerHTML="",this.vaUWTableBody.innerHTML=""},clearBottomContainer(){this.vaMainTableBody.innerHTML="",this.vaSupportTableBody.innerHTML=""},resetFixedDimensions(){this.vaTableBody.style.height="auto"},addMediaSearchEntry(a){let b=this.searchTableBody,c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("p"),f=document.createElement("a");d.style.backgroundImage=`url(${a.coverImage.large})`,d.classList.add("thumbnail"),d.classList.add("clickable"),d.onclick=function(){collectMediaRoles(a)},c.appendChild(d),f.href=a.siteUrl,f.target="_blank",f.innerHTML=a.title.romaji,e.appendChild(f),c.appendChild(e),e.classList.add("thumbnail-caption"),c.appendChild(e),c.classList.add("thumbnail-wrapper"),b.appendChild(c),b.lastChild.style.width=window.getComputedStyle(d).width},setCharacterBrowseHeader(a){this.setVATableHeader(a)},styleMediaSearchTable(a){this.styleVATable(a)},styleCharacterBrowseTable(a){this.styleVATable(a)},addVALanguageEntry(a){let b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("p"),e=document.createElement("a"),f=document.createElement("a"),g=document.createElement("a");c.style.backgroundImage=`url(${a.image.large})`,c.classList.add("thumbnail"),c.classList.add("clickable"),c.onclick=function(){VADetailsOnClick(a.id)},f.innerHTML=parsedName(a.name),f.style.fontWeight="bold",f.href=a.siteUrl,f.target="_blank",d.appendChild(f),d.innerHTML+="<br>",a.media&&(e.innerHTML=a.media[0].title.romaji,e.href=a.media[0].siteUrl,e.target="_blank",d.appendChild(e),d.innerHTML+="<br>"),d.innerHTML+=a.language+"<br>",d.classList.add("thumbnail-caption"),g.innerHTML="See Roles",g.classList.add("clickable"),g.classList.add("internal_link"),g.onclick=function(){VAOnClick(a.id)},d.appendChild(g),b.appendChild(c),b.appendChild(d),b.classList.add("thumbnail-wrapper"),this.vaLanguageTableBody.appendChild(b),this.vaLanguageTableBody.lastChild.style.width=window.getComputedStyle(c).width},setVaLanguageTableHeader(a){if(""==a)this.vaLanguageTable.style.display="none",this.vaLanguageTableHeader.innerHTML=a;else{this.vaLanguageTable.style.display="";let b=a.trim();b=b[0].toUpperCase()+b.slice(1),this.vaLanguageTableHeader.innerHTML=b}},hideEntriesVaLanguageTable(){},showEntriesVaLanguageTable(){}},Minimalist={name:"minimalist",tablePageSize:5,init(){this.vaTable=document.querySelector(".minimalist.va-table"),this.vaTableBody=document.querySelector(".minimalist.va-table-body"),this.followTable=document.querySelector(".minimalist.follow-table"),this.followTableBody=document.querySelector(".minimalist.follow-table-body"),this.rolesTable=document.querySelector(".minimalist.roles-table"),this.rolesTableBody=document.querySelector(".minimalist.roles-table-body"),this.vaPopularTableBody=document.querySelector(".minimalist.va-popular-characters-body"),this.vaUWTableBody=document.querySelector(".minimalist.va-uw-characters-body"),this.vaMainTableBody=document.querySelector(".minimalist.va-main-characters-body"),this.vaSupportTableBody=document.querySelector(".minimalist.va-support-characters-body"),this.searchTableBody=this.vaTableBody,this.characterBrowseTableBody=this.vaTableBody,this.vaLanguageTable=document.querySelector(".minimalist.va-language-table"),this.vaLanguageTableBody=document.querySelector(".minimalist.va-language-table-body")},activate(){let a=document.getElementById("va-bottom-container").children;for(let b of a)b.classList.add("one-half"),b.classList.add("column");let b=document.querySelectorAll(".static-display-top");for(let a of b)a.style.display=a.classList.contains("minimalist")?"":"none"},addFollowTableEntry(a){let b=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("a"),e=document.createElement("td"),f=document.createElement("a"),g=document.createElement("td"),h=document.createElement("a");b.id=a.id,d.classList.add(a.id),window.clicked==a.id&&d.classList.add("clicked"),d.innerHTML=a.name,d.classList.add("clickable"),d.onclick=function(){VADetailsOnClick(a.id)},f.innerHTML="Show All",f.classList.add("clickable"),f.classList.add("internal_link"),f.onclick=function(){VAOnClick(a.id)},h.innerHTML=getDeleteIcon(),h.classList.add("clickable"),g.classList.add("symbol"),h.classList.add("symbol"),h.onclick=function(){unfollow(a)},c.appendChild(d),e.appendChild(f),g.appendChild(h),b.appendChild(c),b.appendChild(e),b.appendChild(g),this.followTableBody.appendChild(b)},clearFollowTable(){this.followTableBody.innerHTML=""},addNoResultsIndicator(a,b){let c=document.createElement("tr");this.appendNACells(c,2),this.getTableBody(a).appendChild(c),b&&(this.getTableBody(a).lastChild.firstChild.innerHTML+=" in selected entry/season")},appendNACells(a,b){for(let c,d=0;d<b;d++)c=document.createElement("td"),c.innerHTML="N/A",a.appendChild(c)},addVATableEntry(a){let b=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("a"),e=document.createElement("td"),f=document.createElement("img"),g=document.createElement("td"),h=document.createElement("a"),i=document.createElement("td"),j=document.createElement("span"),k=document.createElement("td"),l=document.createElement("a");d.innerHTML=a.name,d.classList.add("clickable"),d.onclick=function(){VADetailsOnClick(a.id)},c.appendChild(d),b.appendChild(c),f.src=a.image,f.alt=a.name,f.style.display="none",e.appendChild(f),h.innerHTML="Show All",h.classList.add("clickable"),h.classList.add("internal_link"),h.onclick=function(){VAOnClick(a.id)},g.appendChild(h),b.appendChild(g),numRolesInt=window.seasonalRolesCounter[a.id],numRolesInt&&(j.innerHTML=numRolesInt,i.appendChild(j),b.appendChild(i)),l.innerHTML=isFollowed(a.id)?getBlackStar():getWhiteStar(),l.classList.add("clickable"),l.classList.add("symbol"),k.classList.add("symbol"),l.onclick=function(){l.innerHTML=toggleFollow(a)},d.classList.add(a.id),window.clicked==a.id&&d.classList.add("clicked"),k.appendChild(l),b.appendChild(k),b.classList.add(a.language),this.vaTableBody.appendChild(b)},styleVATable(){let a=this.vaTableBody.children.length,b=document.getElementById("va-table-head-link"),c=document.getElementById("va-table-head-roles"),d=document.getElementById("va-table-head-follow"),e=document.getElementById("va-table-head-extra1"),f=this.vaTable.getAttribute("data-state");0==a?(b.style.display="",c.style.display="none",d.style.display="none",d.style.display="none",e.style.display="none",addNoResultsIndicator("va-table-body")):"search"==f?(b.style.display="",c.style.display="none",d.style.display="",e.style.display="none"):(b.style.display="",c.style.display="",d.style.display="",e.style.display="none")},setVATableHeader(a){let b=document.getElementById("va-table-caption");b.setAttribute("data-content",a)},addRolesTableEntry(a){let b=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("a"),e=document.createElement("td"),f=document.createElement("a");d.innerHTML=a.showName,d.href=a.showUrl,d.target="_blank",f.innerHTML=a.characterName,f.href=a.characterUrl,f.target="_blank",c.appendChild(d),e.appendChild(f),b.appendChild(c),b.appendChild(e),this.rolesTableBody.appendChild(b)},setRolesTableHeader(a){let b=document.getElementById("roles-table-caption");b.setAttribute("data-content",a)},addCharacterEntry(a,b,c){let d=b.character,e=b.show,f=this.getTableBody(a),g=document.createElement("tr"),h=document.createElement("td"),i=document.createElement("a"),j=document.createElement("span"),k=document.createElement("td"),l=document.createElement("a");c?(i.onclick=c,i.classList.add("clickable"),i.classList.add("internal_link"),l.href=d.url,l.target="_blank",l.innerHTML="AniList"):(i.href=d.url,i.target="_blank",l.href=e.siteUrl,l.target="_blank",l.innerHTML=e.title.romaji),i.innerHTML=d.name,i.style.fontWeight="bold",h.appendChild(i),g.appendChild(h),k.appendChild(l),g.appendChild(k),d.nameEmbellish&&(j.innerHTML=" "+d.nameEmbellish,h.appendChild(j)),f.appendChild(g)},getTableBody(a){return"va-table-body"===a?this.vaTableBody:"roles-table-body"===a?this.rolesTableBody:"va-popular-characters"===a?this.vaPopularTableBody:"va-uw-characters"===a?this.vaUWTableBody:"va-main-characters"===a?this.vaMainTableBody:"va-support-characters"===a?this.vaSupportTableBody:"media-search-table-body"===a?this.searchTableBody:"character-browse-table-body"===a?this.characterBrowseTableBody:"va-language-table-body"===a?this.vaLanguageTableBody:void 0},clearSideContainers(){this.vaPopularTableBody.innerHTML="",this.vaUWTableBody.innerHTML=""},clearBottomContainer(){this.vaMainTableBody.innerHTML="",this.vaSupportTableBody.innerHTML=""},resetFixedDimensions(){},addMediaSearchEntry(a){let b=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("a"),e=document.createElement("td"),f=document.createElement("a");d.classList.add("clickable"),d.onclick=function(){unclick(),collectMediaRoles(a)},d.innerHTML=a.title.romaji,d.classList.add("internal_link"),f.href=a.siteUrl,f.target="_blank",f.innerHTML="AniList",c.appendChild(d),b.appendChild(c),e.appendChild(f),b.appendChild(e),this.searchTableBody.appendChild(b)},setCharacterBrowseHeader(a){this.setVATableHeader(a)},styleMediaSearchTable(){0==this.searchTableBody.children.length&&addNoResultsIndicator("media-search-table-body"),document.getElementById("va-table-head-link").style.display="none",document.getElementById("va-table-head-roles").style.display="none",document.getElementById("va-table-head-follow").style.display="none",document.getElementById("va-table-head-extra1").style.display=""},styleCharacterBrowseTable(){0==this.characterBrowseTableBody.children.length&&addNoResultsIndicator("character-browse-table-body"),document.getElementById("va-table-head-link").style.display="none",document.getElementById("va-table-head-roles").style.display="none",document.getElementById("va-table-head-follow").style.display="none",document.getElementById("va-table-head-extra1").style.display=""},addVALanguageEntry(a){let b=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("td"),e=document.createElement("td"),f=document.createElement("td"),g=document.createElement("a"),h=document.createElement("span"),i=document.createElement("a"),j=document.createElement("a");if(g.onclick=function(){VADetailsOnClick(a.id)},g.classList.add("clickable"),g.style.fontWeight="bold",g.innerHTML=parsedName(a.name),h.innerHTML=a.language,i.innerHTML="See Roles",i.classList.add("clickable"),i.classList.add("internal_link"),i.onclick=function(){VAOnClick(a.id)},e.appendChild(i),d.appendChild(h),c.appendChild(g),b.appendChild(c),b.appendChild(d),b.appendChild(e),this.vaLanguageTableBody.appendChild(b),a.media){let c=a.media[0];j.href=c.siteUrl,j.target="_blank",j.innerHTML=c.title.romaji,f.appendChild(j),b.appendChild(f);for(let b of a.media.slice(1)){let a=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("td"),e=document.createElement("td"),f=document.createElement("td"),g=document.createElement("a");g.href=b.siteUrl,g.target="_blank",g.innerHTML=b.title.romaji,f.appendChild(g),a.appendChild(c),a.appendChild(d),a.appendChild(e),a.appendChild(f),this.vaLanguageTableBody.appendChild(a)}}},setVaLanguageTableHeader(a){let b=document.getElementById("va-language-table-caption");b.setAttribute("data-content",a)},styleVaLanguageTable(a){let b=document.getElementById("va-language-table-head-entry");b.style.display=a?"":"none"},hideEntriesVaLanguageTable(){document.getElementById("va-language-table-head-entry").style.display="none"},showEntriesVaLanguageTable(){document.getElementById("va-language-table-head-entry").style.display=""}};