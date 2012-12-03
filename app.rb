require 'sinatra'

get '/' do
  redirect '/index.html', 302
end