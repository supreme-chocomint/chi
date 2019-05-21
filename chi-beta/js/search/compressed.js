function clearSearchBar(){document.getElementById("search-bar").value=""}function searchButtonOnClick(){let a,b=document.getElementById("search-bar"),c=b.value,d=document.getElementById("search-picker").value,e=!1,f={perPage:50,page:1,search:c};if(!isLocked()){if(""==c)return;switch(lock(),clearSeasonSpecificData(),clearVATable(),setVATableState("search"),document.getElementById("tool-help").innerHTML="",window.currentDisplay.setVATableHeader(" search '"+c+"'"),d){case"VA SEARCH":a=collectVASearchResultsCallback;break;case"ANIME SEARCH":a=collectAnimeSearchResultsCallback;break;case"CHARACTER SEARCH":let g=extractCharacter(c),h=extractAnime(c);f.search=g,h?(e=!0,b.setAttribute("data-async-count",0),f.search=h,makeRequest(getQuery("ANIME SEARCH CHARACTER ID"),f,collectCharacterIdsHelperCallback),a=function(a){collectCompoundSearchResultsCallback(a,f)},f.search=g):a=collectCharacterSearchResultsCallback;break;default:return void console.log("Search code unknown; aborting. (This shouldn't ever happen).");}makeRequest(getQuery(d),f,a),window.cachedQueryVariables=f}}function collectVASearchResultsCallback(a){let b=parseVASearchResults(a);fillVATableAndPage(b),unlock()}function parseVASearchResults(a){let b=a.data.Page.staff,c=[];for(let d of b)if(0!=d.characters.nodes.length){let a={id:d.id,name:parsedName(d.name),url:d.siteUrl,image:d.image.large,language:d.language};d.id in window.voiceActors||(window.voiceActors[d.id]=a),c.push(d.id)}return c}function collectAnimeSearchResultsCallback(a){let b=a.data.Page.media.filter(a=>!1==a.isAdult);fillMediaSearchTable(b),unlock()}function collectMediaRoles(a){fillCharacterBrowseTable({Media:a})}function parseCharacterBrowseData(a){let b=parsedName(a.node.name),c={character:{image:a.node.image.large,url:a.node.siteUrl,name:b}};a.voiceActors.sort(function(c,a){return c.language>a.language});return addVasToGlobalHash(a.voiceActors),{role:c,onclick:function(){unclick(),fillVALanguageTable(b,a.voiceActors)}}}function collectCharacterSearchResultsCallback(a){let b=function(a){return!a.node.isAdult},c=a.data.Page.characters.filter(a=>a.media.edges.some(b));fillCharacterSearchTable(c),unlock()}function collectCompoundSearchResultsCallback(a,b){let c=document.getElementById("search-bar"),d=parseInt(c.getAttribute("data-async-count"));if(d++,c.setAttribute("data-async-count",d),2<=d)filterCharacterSearchById(a,window.cachedCharacterIds);else return void(window.cachedResponse=a);let e=function(a){return!a.node.isAdult},f=a.data.Page.characters.filter(a=>a.media.edges.some(e));if(a.data.Page.pageInfo.hasNextPage?0!=f.length&&fillCharacterSearchTable(f,b):fillCharacterSearchTable(f,b),a.data.Page.pageInfo.hasNextPage){window.cachedQueryVariables.page=parseInt(window.cachedQueryVariables.page)+1;return void makeRequest(getQuery("CHARACTER SEARCH"),window.cachedQueryVariables,function(a){collectCompoundSearchResultsCallback(a,!0)})}unlock()}function filterCharacterSearchById(a,b){let c=a.data.Page.characters;a.data.Page.characters=c.filter(a=>b[a.id])}function collectCharacterIdsHelperCallback(a){let b=document.getElementById("search-bar"),c=b.getAttribute("data-async-count");c++,b.setAttribute("data-async-count",c);let d=a.data.Page.media;window.cachedCharacterIds={};for(let b of d)for(let a of b.characters.edges)window.cachedCharacterIds[a.node.id]=!0;2==c&&collectCompoundSearchResultsCallback(window.cachedResponse)}function parseCharacterSearchData(a){let b={},c=[],d=!1,e=parsedName(a.name),f={character:{image:a.image.large,url:a.siteUrl,name:e}},g=a.media.edges.sort(function(c,a){return a.node.popularity-c.node.popularity});for(let c of g){let a=c.node;if("ANIME"!=a.type)continue;d=!0;let e=c.voiceActors;for(let c of e){let d=c;d.media=[a],null==b[c.id]?b[c.id]=d:b[c.id].media.push(a)}}if(!d)return null;c=Object.values(b),f.character.nameEmbellish=`from ${a.media.edges[0].node.title.romaji}`;let h=c.sort(function(c,a){return c.language==a.language?c.media[0].popularity>a.media[0].popularity?-1:1:c.language<a.language?-1:1});return addVasToGlobalHash(h),{role:f,onclick:function(){unclick();fillVALanguageTable(e,h,!0)}}}function extractCharacter(a){return a.split(",")[0].split(" from ")[0].trim()}function extractAnime(b){let c=b.split(",").slice(-1)[0];return c=c.split(" from ").slice(-1)[0],b==c?null:c.trim()}function addVasToGlobalHash(a){for(let b of a){let a={id:b.id,image:b.image.large,language:b.language,name:parsedName(b.name),url:b.siteUrl};window.voiceActors[a.id]==null&&(window.voiceActors[a.id]=a)}}function buildSearchPicker(){let a=document.getElementById("search-picker"),b=["Voice actor","Anime","Character"],c=["VA SEARCH","ANIME SEARCH","CHARACTER SEARCH"];for(let d,e=0;e<b.length;e++)d=document.createElement("option"),d.value=c[e],d.innerHTML=b[e],a.appendChild(d);a.onchange=function(){document.getElementById("tool-help").innerHTML=getExplainString()}}function fillMediaSearchTable(a){let b=window.currentDisplay.searchTableBody,c=window.currentDisplay.tablePageSize;b.style.visibility="hidden";let d=0;for(let c of a){addMediaSearchEntry(c);let a=b.lastChild;a.id=d,d++}window.currentDisplay.styleMediaSearchTable(!1),switchToPage(0,"ALL"),setNavigationState(b,c,"ALL"),b.style.visibility=""}function addMediaSearchEntry(a){window.currentDisplay.addMediaSearchEntry(a)}function fillCharacterBrowseTable(a){let b=window.currentDisplay.characterBrowseTableBody,c=window.currentDisplay.tablePageSize,d=` ${a.Media.title.romaji} characters`;window.currentDisplay.setCharacterBrowseHeader(d),b.style.visibility="hidden",b.innerHTML="";for(let b of a.Media.characters.edges){let a=parseCharacterBrowseData(b);window.currentDisplay.addCharacterEntry("character-browse-table-body",a.role,a.onclick)}window.currentDisplay.styleCharacterBrowseTable(!1),switchToPage(0,"ALL"),setNavigationState(b,c,"ALL"),b.style.visibility=""}function fillCharacterSearchTable(a,b){let c=window.currentDisplay.characterBrowseTableBody,d=window.currentDisplay.tablePageSize;c.style.visibility="hidden",b||(c.innerHTML="");for(let c of a){let a=parseCharacterSearchData(c);null!=a&&window.currentDisplay.addCharacterEntry("character-browse-table-body",a.role,a.onclick)}window.currentDisplay.styleCharacterBrowseTable(!1),switchToPage(0,"ALL"),setNavigationState(c,d,"ALL"),c.style.visibility=""}function fillVALanguageTable(a,b,c){window.currentDisplay.rolesTable.style.display="none",window.currentDisplay.vaLanguageTable.style.display="";let d=window.currentDisplay.vaLanguageTableBody;window.currentDisplay.setVaLanguageTableHeader(` VAs for ${a}`),d.innerHTML="";for(let d of b)window.currentDisplay.addVALanguageEntry(d);c?window.currentDisplay.showEntriesVaLanguageTable():window.currentDisplay.hideEntriesVaLanguageTable(),0==b.length&&window.currentDisplay.addNoResultsIndicator("va-language-table-body",`<br>It's possible this character didn't have a speaking role
      in the searched season/entry. Try searching under a different season
      (e.g. "Hibike Euphonium 2" instead of "Hibike Euphonium").`)}