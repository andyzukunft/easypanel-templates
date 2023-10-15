import { Output, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];
  var eulaAccepted = input.acceptEula ? "Y" : "N";
  //var randomGeneratedPassword = randomPassword();
  //var passwordHash = bcryptHash(randomGeneratedPassword);

  /*
  ports.push({
      published: input.ingestionPort,
      target: input.ingestionPort,
    });*/

  services.push({
    type: "app",
    data: {
      projectName: input.projectName,
      serviceName: input.appServiceName,
      source: {
        type: "image",
        image: input.appServiceImage,
      },
      //memory: input.maximumMemory,
      domains: [
        {
          host: "$(EASYPANEL_DOMAIN)",
          port: input.webPort,
        },
        {
          host: "ingest-$(EASYPANEL_DOMAIN)",
          port: input.ingestionPort,
        },
      ],
      //ports,
      deploy: { replicas: 1, command: null, zeroDowntime: true },
      env: [
        //'SEQ_API_CANONICALURI ??',
        `ACCEPT_EULA=${eulaAccepted}`,
        `SEQ_FIRSTRUN_ADMINUSERNAME=${input.adminUserName}`,
      ].join("\n"),
      mounts: [
        {
          type: "volume",
          name: "data",
          mountPath: "/data",
        },
      ],
    },
  });

  return { services };
}
