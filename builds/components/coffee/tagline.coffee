$ = require 'jquery'

do fill = (item = 'The most beautiful city in entire world') ->
	$('#tagline').append "#{item}"
fill