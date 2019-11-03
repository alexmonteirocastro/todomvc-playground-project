const cleanup = (signal) => {
  return new Promise((resolve) => {
	console.log('... called signal: ' + signal);
  	console.log('... in cleanup')
  	setTimeout(() => {
  		console.log('... cleanup finished');
  		resolve();
  	}, 1000)
  });
}

export const gracefulShutdownOptions = {
  signals: 'SIGINT SIGTERM',
  timeout: 30000,
  development: false,
  onShutdown: cleanup,
  finally: function() {
    console.log('Server gracefully shut down.....')
  }
}