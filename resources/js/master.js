/*
 * master js file
 *
 */
ko.bindingHandlers.fadeVisible = {
		
		init: function(element, valueAccessor){},
		update: function(element, shouldDisplay){
                        shouldDisplay() ? $(element).fadeIn() : $(element).fadeOut();
		}
};
// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var self = this;
    self.firstName = "Bert";
    self.lastName = "Bertington";
    self.title = "LK";

     self.people = ko.observableArray([
        { name: 'First Item' },
        { name: 'Second Item' },
        { name: 'Third Item' },
        { name: 'Fourth Item' },
        { name: 'Fifth Item' },
        { name: 'Sixth Item' },
        { name: 'Seventh Item' },
        { name: 'Eight Item' },
        { name: 'Sixth Item' },
        { name: 'Seventh Item' },
        { name: 'Eight Item' },
        { name: 'Sixth Item' },
        { name: 'Seventh Item' },
        { name: 'Eight Item' },
        { name: 'Ninth Item' }
    ]);

    self.selectedFile = ko.observable();


    self.pageNumber = ko.observable(0);
    self.nbPerPage = 10;
    self.totalPages = ko.computed(function() {
        var div = Math.floor(self.people().length / self.nbPerPage);
        div += self.people().length % self.nbPerPage > 0 ? 1 : 0;
        return div;
    });

    self.paginated = ko.computed(function() {
        var first = self.pageNumber() * self.nbPerPage;
        return self.people.slice(first, first + self.nbPerPage);
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
    	}
        //self.selectedFile(item);
    
    }
    

}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
