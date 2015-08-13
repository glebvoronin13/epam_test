var news = {
	data : {
		API_KEY : '39632d9e64fdc9f02304d26c7b04d2c9:6:72635724',
		IMG_DOMAIN : 'http://nytimes.com/',
		NO_IMG : "img/no_img.jpg",
		page : '1'
	},
	articles : [],
	getJson : function (page, query) {
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
			xhr = new XHR(),
			search,
			url;
			if (query) { search = '&q=' + query } else search = '';
			url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?page='+ page + search + '&api-key='+this.data.API_KEY;
		xhr.open('GET', url, true);
		xhr.onload = function() {
		  news.parseData(this.responseText, page);
		}
		xhr.onerror = function() {
		  news.parseData(false, false);
		}
		xhr.send();
	},
	parseData : function (data, page) {
		if (data) {
			var rawdata = JSON.parse(data),
			end = page*10,
			i = end-9,
			doc = 0,
			ind,
			tmp_title, tmp_img, tmp_text, tmp_haspic;
			if (rawdata.response.docs.length == 0) {
				alert("No articles found or connection error"); 
			} else {
				for (i; i<=end; i++) {
					if (rawdata.response.docs[doc].headline.name) {
						tmp_title = rawdata.response.docs[doc].headline.name;
					} 
					else if (rawdata.response.docs[doc].headline.main) {
						tmp_title = rawdata.response.docs[doc].headline.main;
					}
					if (rawdata.response.docs[doc].lead_paragraph) {
						tmp_text = rawdata.response.docs[doc].lead_paragraph;
					} else if (rawdata.response.docs[doc].snippet) {  
						tmp_text = rawdata.response.docs[doc].snippet;
					} else { alert('LOAD ERROR OCCURED'); }
					tmp_haspic = false;
					if (rawdata.response.docs[doc].multimedia) {
						for (ind = 0, tmp_img = rawdata.response.docs[doc].multimedia; ind < tmp_img.length; ind++) {
							if (tmp_img[ind].height > 225) { tmp_img = this.data.IMG_DOMAIN + tmp_img[ind].url; tmp_haspic = true; break; }
						}
					} 
					if (!tmp_haspic) { tmp_img = this.data.NO_IMG; }
					doc++;
					this.addArticle(i, tmp_title, tmp_img, tmp_text);
				}
				this.renderPage(page);
			}
		} else {
			//console.log('FATAL ERROR');
			alert('Sorry, no data recieved');
		}
	},
	addArticle : function (id, heading, img, content) {
		this.articles[id] = {
			title : heading,
			image : img,
			text : content
		}
	},
	renderPage : function(page) {
		var block = [],
			thumb = [],
			title = [],
			brd,
			end = page*10,
			i = end-9,
			doc = document;

		brd = doc.getElementById("js-news");
		for (i; i<=end; i++) {
		block[i] = doc.createElement("div");
		thumb[i] = doc.createElement("div");
		title[i] = doc.createElement("div");
		block[i].className = "article";
		thumb[i].className = "article-thumb";
		title[i].className = "title";
		block[i].appendChild(thumb[i]);
		block[i].appendChild(title[i]);
			title[i].innerHTML = "<a onclick='news.showDetails(" + i + ");'>" + this.articles[i].title + "</a>";
			thumb[i].innerHTML = "<img src='" + this.articles[i].image + "' alt='" + this.articles[i].title + "'>;"
			brd.appendChild(block[i]);
		}
		this.loading(false);
	},
	nextPage : function() {
		this.loading(true);
		this.data.page++;
		this.init(this.data.page);
	},
	closeDetails : function() {
		var popup, lock;
		popup = document.getElementById("js-news-popup");
		lock = document.getElementById("js-lock-scr");
		lock.className = "";
		popup.style.opacity = '0';
		popup.style.visibility = 'hidden';
		popup.innerHTML = "";
	},
	showDetails : function(id) {
		var block_pop,
			overlay,
			popup,
			head,
			content,
			doc = document;
		block_pop = doc.getElementById("js-news-popup");
		overlay = doc.createElement("div");
		popup = doc.createElement("div");
		head = doc.createElement("div");
		content = doc.createElement("div");
		overlay.className = "overlay";
		overlay.setAttribute("onclick", "news.closeDetails();");
		head.className = "popup-head";
		popup.className = "popup";
		content.className = "js-popup-content popup-content"
		head.innerHTML = "<span class='close' onclick='news.closeDetails();'><img src='img/close.png' alt=''></span>";
		content.innerHTML = "<h2>" + this.articles[id].title + "</h2><div class='detailed-img'><img src=" + this.articles[id].image + " alt=" + this.articles[id].title + "></div><p>" + this.articles[id].text + "</p>"
		popup.appendChild(head);
		popup.appendChild(content);
		block_pop.appendChild(overlay);
		block_pop.appendChild(popup);
		block_pop.style.visibility = 'visible';
		block_pop.style.opacity = '1';
		lock = document.getElementById("js-lock-scr");
		lock.className = "scrl-lock";
		 document.onkeydown = function(evt) {
		    evt = evt || window.event;
		    if (evt.keyCode == 27) { news.closeDetails(); }
		};
	},
	getQuery : function() {
		var query = location.search.substr(1),
			result = {},
			item;
		query.split("&").forEach(function(part) {
			item = part.split("=");
			result[item[0]] = decodeURIComponent(item[1]);
			});
		return result.search || false;
	},
	loading : function(state) {
		load = document.getElementById('js-loading');
		if (state) {
			load.style.display = 'block';
			load.style.opacity = '1';
		} else {
			load.style.display = 'none';
			load.style.opacity = '0';
		}
	},
	showMSearch : function() {
		var search;
		search = document.getElementById('js-mob-search');
		search.style.display = 'block';
		search.style.maxHeight = '70px';
	},
	openOffcanvas : function() {
		var offcanvas;
		offcanvas = document.getElementById("js-offcanvas");
		offcanvas.style.visibility = 'visible';
		offcanvas.style.opacity = '1';
	},
	closeOffcanvas : function() {
		var offcanvas;
		offcanvas = document.getElementById("js-offcanvas");
		offcanvas.style.opacity = '0';
		offcanvas.style.visibility = 'hidden';
	},
	init : function(page) {
		this.data.page = page;
		this.getJson(this.data.page, this.getQuery());
	}

}

news.init(1);
 
