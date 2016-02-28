var tagnames = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: 'resources/tagnames.json',
    filter: function(list) {
      return $.map(list, function(cityname) {
        return { name: cityname }; });
    }
  }
});
tagnames.initialize();

$('#txtTagSearch').tagsinput({
  typeaheadjs: {
    name: 'tagnames',
    displayKey: 'name',
    valueKey: 'name',
    source: tagnames.ttAdapter()
  }
});


