$ = require 'jquery'

do fill = (item = 'The most beautiful city in the world') ->
	$('#tagline').append "#{item}"
fill