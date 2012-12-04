set :application, "Demp"
set :repository,  "git://github.com/mingjin/demp.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set :deploy_via, :remote_cache

set :location, '10.18.9.193'
role :web, location                          # Your HTTP server, Apache/etc
role :app, location                          # This may be the same as your `Web` server
role :db, location, :primary=>true
#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

set :user, "ubuntu"
ssh_options[:keys] = [File.join(".", "config/keys", "key_infra.pem")] 
#set :normalize_asset_timestamps, false

set :rack_env, :production

# Load RVM's capistrano plugin.    
require "rvm/capistrano"

set :rvm_path, '/usr/local/rvm/'
set :rvm_bin_path, '/usr/local/rvm/bin'
set :rvm_ruby_string, '1.9.3-p327@demp'

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"
before 'deploy:finalize_update', 'deploy:process_assets' 

set :thin_pid, "tmp/pids/thin.pid"

namespace :deploy do
  task :process_assets, :roles => :app do
    run "cd #{current_release} && bundle exec rake package"
  end

  task :start, :roles => :app do
    run "cd #{current_path} && rm -rf tmp && rm -rf log"
    run "cd #{current_path} && bundle exec thin start -C config/environment.yml"
  end
  
  task :stop, :roles => :app do 
    run "cd #{current_path} && if [ -f #{thin_pid} ]; then bundle exec thin stop; fi"
  end
  
  task :restart, :roles => :app do
    stop
    start
  end
end
