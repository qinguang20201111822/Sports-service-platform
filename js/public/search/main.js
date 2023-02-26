require.config({
    paths:{
        "jquery": "../../jQuery",
        "jquery_cookie":"../../jquery.cookie",
        "search":"search"
    },
    shim:{
        "jquery_cookie": ["jquery"]    
    }
})

require(["search"],function(search){
    search.search();
})