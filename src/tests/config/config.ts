/**
 * Created by pedrosousabarreto@gmail.com on 15/Jan/2019.
 */

"use strict";

import {ServiceConfigs, AppBaseConfigs} from "../../service_configs";
import {HashicorpVaultProvider} from "../../config_providers/hashicorp_vault";
import {AWSSecretsManagerProvider} from "../../config_providers/aws_secrets_manager";

let app_base_confs = new AppBaseConfigs();
app_base_confs.env = process.env.NODE_ENV || 'dev_local';
app_base_confs.solution_name = "my_solution";
app_base_confs.app_name = "my_app";
app_base_confs.app_version = "0.0.1";
app_base_confs.app_api_prefix = "";
app_base_confs.app_api_version = "1";


// First load the required params with their default values
import svc_params = require("./params");
// check if overrides is enabled and an override file exists and if so, apply it
svc_params.override_from_env_file(app_base_confs);

const aws_secrets_manager_provider = new AWSSecretsManagerProvider(
	app_base_confs.solution_name,
	"development/bynder-localisation/settings",
	"arn:aws:iam::745091492598:role/Developer",
	"nodeSession",
	"eu-central-1"
);


//
// const vault_url = "http://localhost:8200";
// const vault_token = "myroot";
// const vault_provider = new HashicorpVaultProvider(app_base_confs.solution_name, app_base_confs.app_name, vault_url, vault_token);

// exports a ServiceConfigs instance
export = new ServiceConfigs(svc_params, aws_secrets_manager_provider, app_base_confs);
// export = new ServiceConfigs(svc_params, vault_provider, app_base_confs);