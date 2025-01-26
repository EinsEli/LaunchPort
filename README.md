<div align="center" >
	<a href="https://github.com/EinsEli/LaunchPort">
		<picture>
			<source height="125px" media="(prefers-color-scheme: dark)" srcset="/docs/img/logo/dark.svg">
			<img height="125px" src="/docs/img/logo/light.svg" />
		</picture>
	</a>
	<h1>LaunchPort</h1>
	<p>
		A centralized dashboard for managing apps routed through a reverse proxy.
	</p>
	<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/line.png" />
</div>

<br/>
<br/>

## 🚀 What is LaunchPort

LaunchPort simplifies access and management of your applications by providing a user-friendly control dashboard.  
When paired with a reverse proxy like [SWAG](https://docs.linuxserver.io/images/docker-swag/), LaunchPort handles requests to inactive applications by redirecting users to a dedicated control page.

<br/>

---

<br/>

### 📦 Installation

LaunchPort can be installed using Docker.

1. Download the `docker-compose.yaml` file [here](docker-compose.yaml).
2. Edit the `docker-compose.yaml` file and change the environment variables to your liking.
3. Run `docker-compose up -d` in the same directory as the `docker-compose.yaml` file.
4. Open your browser and navigate to [`http://localhost:3000`](http://localhost:3000).

| Environment Variable | Description                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | The database URL in the format: <br/> `postgresql://user:password@host:port/database?schema=public` |
| `AUTH_URL`           | The URL for accessing LaunchPort.                                                              |
| `AUTH_SECRET`        | A secret used for authentication purposes.                                                                   |

<br/>

### 🔗 Configuring the Reverse Proxy

To allow LaunchPort to redirect requests, you must configure your Reverse Proxy so that it redirects  
users to your LaunchPort instance in case of a Bad Gateway error. If you are using SWAG / Nginx you can follow these steps:

1. Create a file `launchport.conf`

```conf
error_page 502 =302 https://launchport.example.com/redirect?origin=$target_url;
```

2. For each site you want LaunchPort to cover, include the created file in the location block.
```conf
location / {
	# LaunchPort
	include /config/nginx/launchport.conf;
	
	# enable the next two lines for http auth
	#auth_basic "Restricted";
	#auth_basic_user_file /config/nginx/.htpasswd;

	#...
}
```

<br/>

---

<br/>


### 📸 Screenshots

<div align="center">
	<img src="/docs/screenshots/admin_dashboard.png" width="49%" />
	<img src="/docs/screenshots/admin_applications.png" width="49%" />
	<img src="/docs/screenshots/admin_applications_edit.png" width="49%" />
	<img src="/docs/screenshots/admin_settings.png" width="49%" />
	<img src="/docs/screenshots/application_control.png" width="49%" />
	<img src="/docs/screenshots/auth.png" width="49%" />
</div>

<br/>

---

<br/>

> [!NOTE]
> This project is my first public project and I am still learning a long the way.  
> Feel free to contribute by fixing bugs, adding new features, improving the code quality  
> and help make LaunchPort better for everyone!
