require 'rake'

namespace :server do
  task :start do
    sh 'bundle exec rackup -p 4567'
  end
end

task :package do
    sh 'bundle exec hpp process source public'
end

task :guard do
    sh 'bundle exec hpp process source public --daemon'
end