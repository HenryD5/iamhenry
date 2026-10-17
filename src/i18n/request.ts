import { getRequestConfig } from "next-intl/server";
import blogMessages from "@/modules/blog/locales/es.json";
import homeMessages from "@/modules/home/locales/es.json";
import notFoundMessages from "@/modules/not-found/locales/es.json";
import projectsMessages from "@/modules/projects/locales/es.json";
import sharedMessages from "@/shared/locales/es.json";

export default getRequestConfig(async () => ({
  locale: "es",
  messages: {
    blog: blogMessages,
    home: homeMessages,
    notFound: notFoundMessages,
    projects: projectsMessages,
    shared: sharedMessages,
  },
}));
