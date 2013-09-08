<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="UTF-8">
		<title>P Desktop</title>
		<LINK href="favicon.ico" type="image/x-icon" rel=icon />
		<LINK href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
		<link rel="stylesheet" href="pdesktop/PSH.css">
		<script type="text/javascript" src="pdesktop/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="pdesktop/pdesktop.js"></script>
		<script type="text/javascript">
		$(document).ready(function(){

			var desktop = new PDesktop();
			var titlebar = new PTitleBar();	
			var note = new PNote();
			
			var apps = [desktop, titlebar, note];
			
			var psh = new PSH({
				applications: apps
			});

			psh.create();
			

			
		});
		/**
		 * 
		 */
		function PNote(config){
			PApplication.apply(this, [config]);

			
			this.type = 0;

			this.id = 'NoteApp';
			this.name = 'NoteApp';
			
			this.onDraw = function(){

			};
			
			
			this.noconfig.push('type');
			
			this.initClass({className: 'PNote'}, function(){
				this.initConfig(config);
			});

			
		}
		</script>
	</head>
</html>