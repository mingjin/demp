require 'sinatra'

get '/' do
  redirect '/login.html', 302
end

not_found do
  redirect '/404.html', 302
end