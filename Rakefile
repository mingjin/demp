require 'rake'

namespace :server do
  task :start do
    sh 'thin start -C config/environment.yml'
  end

  task :stop do
    sh 'thin stop -C config/environment.yml'
  end
end

task :package do
    sh 'hpp process source public'
end

task :guard do
    sh 'hpp process source public --daemon'
end