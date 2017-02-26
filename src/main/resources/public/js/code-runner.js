function CodeRunner(outputId) {

	var me = this;
	
	this.outputId = outputId;

	function replaceConsole(outputId) {
		console.log("Replacing console.");
		if (typeof console  != "undefined") 
		    if (typeof console.log != 'undefined')
		        console.olog = console.log;
		    else
		        console.olog = function() {};

		console.log = function(message) {
		    console.olog(message);
		    newconsole(message);
		};
		console.error = console.debug = console.info = console.log;
	};

	function newconsole(message) {
		var line = $(document.createElement("p"));
		line.addClass("codeOutput");
		line.html(getHTMLForOutput(message));
		$('#' + me.outputId).append(line);
	};

	function newerror(message) {
		var line = $(document.createElement("p"));
		line.addClass("codeOutputError");
		line.text(message);
		$('#' + me.outputId).append(line);
	};



	this.runThis = function(code) {
		try {
			eval(code);
			insertCodeOutputSeparator();
		} catch (e) {
			newerror(e);
		}
		scrollToBottom();
	};

	function insertCodeOutputSeparator() {
		var line = $(document.createElement("hr"));
		line.addClass("codeRunSeparator");
		$('#' + me.outputId).append(line);
	}

	function scrollToBottom() {
		// var d = $('#' + me.outputId);
		// d.scrollTop(d.prop("scrollHeight"));
		$('#' + me.outputId).animate({ scrollTop: $('#' + me.outputId).prop("scrollHeight")}, 300);
	};

	function getHTMLForOutput(value, withQuotesIfString) {
		if(typeof value == "object") {
			if(Array.isArray(value)) {
				var s = $(document.createElement("span"));
				var prefix = $(document.createElement("span")).addClass("typePrefixOutput");
				prefix.text("Array");
				s.append(prefix).append(squareOpen());
				for(var i = 0; i < value.length; i++) {
					s.append(getHTMLForOutput(value[i], true));
					if(i != value.length - 1) { //last element
						s.append(commaSeparator());
					}
				}
				s.append(squareClose());
				return s;
			} else {
				var s = $(document.createElement("span"));
				var prefix = $(document.createElement("span")).addClass("typePrefixOutput");
				prefix.text("Object");
				s.append(prefix).append(curlyOpen());
				var notEmpty = false;
				for(var k in value) {
					if(value.hasOwnProperty(k)) {
						notEmpty = true;
						var key = $(document.createElement("span")).addClass("keyOutput").text(k);
						s.append(key);
						s.append(colonSeparator());
						s.append(getHTMLForOutput(value[k], true));
						s.append(commaSeparator());
					}
				}
				if(notEmpty) s[0].removeChild(s[0].lastChild); //remove last comma
				s.append(curlyClose());
				return s;
			}
		} else if(typeof value == "string") {
			var s = $(document.createElement("span"));
			s.addClass("stringOutput");
			if(withQuotesIfString) {
				value = '"' + value + '"';
			}
			s.text(value);
			return s;
		} else if(typeof value == "number") {
			var s = $(document.createElement("span"));
			s.addClass("numberOutput");
			s.text(value);
			return s;
		} else if(typeof value == "boolean") {
			var s = $(document.createElement("span"));
			s.addClass("booleanOutput");
			s.text(value);
			return s;
		}

		function handleBoolean(value) {

		}
		function handleNumber(value) {

		}
		function handleString(value) {

		}
		function handleObject(value) {

		}
		function handleArray(value) {

		}
		function squareOpen() {
			return $(document.createElement("span")).addClass("greyOutput").text(" [ ");
		}
		function squareClose() {
			return $(document.createElement("span")).addClass("greyOutput").text(" ]");
		}
		function curlyOpen() {
			return $(document.createElement("span")).addClass("greyOutput").text(" { ");
		}
		function curlyClose() {
			return $(document.createElement("span")).addClass("greyOutput").text(" }");
		}
		function commaSeparator() {
			return $(document.createElement("span")).addClass("greyOutput").text(", ");
		}
		function colonSeparator() {
			return $(document.createElement("span")).addClass("greyOutput").text(": ");
		}
	}

	replaceConsole(outputId);

}