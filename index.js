javascript:(function(){

    //get all inputs and textareas as an array
    function getElements() {
        var inputs = document.getElementsByTagName('input');
        var textareas = document.getElementsByTagName('textarea');
        return [].concat(toArray(inputs), toArray(textareas));
    }

    //convert array like object to array
    function toArray(collection) {
        return Array.prototype.slice.call(collection);
    }

    //gets all attached jq events for an element
    function getJQEvents($el) {
        return jQuery._data($el.get(0), 'events');
    }

    var hasJQuery = ('jQuery' in window);

    //removes all cut|copy|paste events
    function enableEvents(el) {
    	var hasEvents = el.onpaste || el.oncopy || el.oncut;
        var hasJQEvents;

        //this would mean all event listeners are disabled
        //el.replaceChild(el.cloneNode(true));

        //only touch these if one of the events exists
        if(hasEvents) {
            el.onpaste = el.oncopy = el.oncut = null;
        }

    	if(hasJQuery) {
    		var $el = jQuery(el);
    		$el.off('paste copy cut');
            try {
                hasJQEvents = Object.keys(getJQEvents($el)).some(function(evName) {
                    return evName.search(/cut|copy|paste/gi);
                });
            } catch(e){}
    	}

        return hasEvents || hasJQEvents;
    }

    //returns all elements that had either paste, copy, or cut events
    function enableCCP() {
        return getElements().filter(enableEvents);
    }

    function init() {
        alert(enableCCP().length + ' fields have been re-enabled.');
    }

    init();

}());
