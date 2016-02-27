/*
 * master js file
 *
 */

//https://github.com/bassjobsen/Bootstrap-3-Typeahead
//http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/

ko.bindingHandlers.fadeVisible = {
		
		init: function(element, valueAccessor){},
		update: function(element, shouldDisplay){
                        shouldDisplay() ? $(element).fadeIn() : $(element).fadeOut();
		}
};
var file_ff = function(name, path, type){
    var self = this;
    self.name = name;
    self.path = path;
    self.type = type;
}

var itemGroup = function(name,fileList,taglist,description){
    var self = this;
    self.name = name;
    self.fileList = fileList;
    self.taglist = taglist;
    self.description=description;
} 
var getFileList = function(name){
    var fileList = new Array();
    for (var i=0; i < 5; ++i) {
        var fileType = i ==0 ? "pcap" : "txt";
        var file_fx = new file_ff(name+"_"+i,"path_"+i,fileType);
        fileList.push(file_fx);
        
    }
    return fileList;

}
var getTagList = function(){
    var tagList = new Array();
    tagList.push("Success");
    tagList.push("Transcoder");
    tagList.push("Anonymous");
    return tagList;

}

var getdescription = function(){
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque arcu vel odio dapibus blandit. Proin mauris nulla, rutrum ac hendrerit vitae, pulvinar eu sapien. Morbi imperdiet, sapien a placerat semper, sapien quam cursus mi, nec rhoncus nibh magna a enim. Vivamus metus arcu, tempus lobortis imperdiet et, ornare quis justo. Suspendisse potenti. Donec at lorem at elit elementum sodales. Fusce posuere mollis neque, sit amet aliquam ligula convallis eget. Sed sit amet justo at nulla consequat vulputate. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";
}
// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var self = this;
    self.firstName = "Bert";
    self.lastName = "Bertington";
    self.title = "LK";

    self.fileGroup = ko.observableArray(); 


    var fileGroupItem = new itemGroup("First File", getFileList("First"),getTagList());
    self.fileGroup.push(fileGroupItem);
    fileGroupItem = new itemGroup("Second File", getFileList("Second"),undefined,getdescription());
    self.fileGroup.push(fileGroupItem);

    self.selectedFile = ko.observable();
    self.selectedSubFiles = ko.observableArray([]);
    self.selectedTagList = ko.observableArray([]);


    self.pageNumber = ko.observable(0);
    self.nbPerPage = 10;
    self.totalPages = ko.computed(function() {
        var div = Math.floor(self.fileGroup().length / self.nbPerPage);
        div += self.fileGroup().length % self.nbPerPage > 0 ? 1 : 0;
        return div;
    });

    self.paginated = ko.computed(function() {
        var first = self.pageNumber() * self.nbPerPage;
        return self.fileGroup.slice(first, first + self.nbPerPage);
    });
    self.hasPrevious = ko.computed(function() {
        return self.pageNumber() !== 0;
    });
    self.hasNext = ko.computed(function() {
        return self.pageNumber() !== ( self.totalPages()-1 );
    });
    self.next = function() {
        if(self.pageNumber() < self.totalPages()-1) {
            self.pageNumber(self.pageNumber() + 1);
        }
    }

    self.previous = function() {
        if(self.pageNumber() != 0) {
            self.pageNumber(self.pageNumber() - 1);
        }
    }

    self.gotoPage = function(item,event){
        var p = parseInt( event.target.innerHTML );
        self.pageNumber(p-1);
    }

    self.fileClicked = function(item, event){
    	if(self.selectedFile() && item.name === self.selectedFile().name){
    		self.selectedFile(''); 
    	}else{ 
            self.selectedFile(item); 
            self.selectedSubFiles(item.fileList);
            self.selectedTagList(item.taglist);
    	}
        //self.selectedFile(item);
    
    }

    self.closeFile = function(){
        self.selectedFile('');
    }
    

}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
