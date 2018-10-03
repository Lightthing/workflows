$ = require 'jquery'

do fill = (item = 'The most beautiful city in the World') ->
	$('#tagline').append "#{item}"
fill