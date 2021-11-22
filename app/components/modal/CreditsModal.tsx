import { Link } from "remix";
import { Modals } from "~/lib/constants";
import { Modal } from "./Modal";

const BUG_REPORT_URL =
  "https://github.com/dev-caspertheghost/notey.app/issues/new?assignees=Dev-CasperTheGhost&labels=bug&template=bug_report.md&title=%5BBUG%5D+";

const FEATURE_REQUEST_URL = "https://github.com/dev-caspertheghost/notey.app/issues";

const LICENSE_URL = "https://github.com/Dev-CasperTheGhost/notey.app/blob/HEAD/LICENSE";

export const CreditsModal = () => {
  return (
    <Modal title="Credits" id={Modals.Credits}>
      <div className="w-full mt-5">
        <div className="flex flex-col space-y-1 ">
          <a target="_blank" className="w-full link" href={BUG_REPORT_URL}>
            Report a bug
          </a>
          <a target="_blank" className="w-full link" href={FEATURE_REQUEST_URL}>
            Request a feature
          </a>
          <a target="_blank" className="w-full mb-5 link" href={LICENSE_URL}>
            License
          </a>
        </div>

        <div className="block h-0.5 my-5 rounded-md bg-dark-4" />

        <a target="_blank" className="block mb-2 underline" href="https://icons.getbootstrap.com">
          Icons from bootstrap
        </a>

        <p>
          Made with ❤️ by{" "}
          <a className="underline" target="_blank" href="https://caspertheghost.me">
            CasperTheGhost
          </a>{" "}
          on{" "}
          <a
            className="underline"
            target="_blank"
            href="https://github.com/dev-caspertheghost/notey.app"
          >
            Github
          </a>
        </p>
      </div>
    </Modal>
  );
};
