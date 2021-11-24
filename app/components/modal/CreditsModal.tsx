import { Modals } from "~/lib/constants";
import { Modal } from "./Modal";

const BUG_REPORT_URL =
  "https://github.com/dev-caspertheghost/notey.app/issues/new?assignees=Dev-CasperTheGhost&labels=bug&template=bug_report.md&title=%5BBUG%5D+";

const FEATURE_REQUEST_URL = "https://github.com/dev-caspertheghost/notey.app/issues";

const LICENSE_URL = "https://github.com/Dev-CasperTheGhost/notey.app/blob/HEAD/LICENSE";

const Link = (props: JSX.IntrinsicElements["a"]) => (
  <a {...props} target="_blank" rel="noreferrer noopener" />
);

export const CreditsModal = () => {
  return (
    <Modal title="Credits" id={Modals.Credits}>
      <div className="w-full mt-5">
        <div className="flex flex-col space-y-1 ">
          <Link className="w-full link" href={BUG_REPORT_URL}>
            Report a bug
          </Link>
          <Link className="w-full link" href={FEATURE_REQUEST_URL}>
            Request a feature
          </Link>
          <Link className="w-full mb-5 link" href={LICENSE_URL}>
            License
          </Link>
        </div>

        <div className="block h-0.5 my-5 rounded-md bg-dark-4" />

        <Link className="block mb-2 underline" href="https://icons.getbootstrap.com">
          Icons from bootstrap
        </Link>

        <p>
          Made with ❤️ by{" "}
          <Link className="underline" href="https://caspertheghost.me">
            CasperTheGhost
          </Link>{" "}
          on{" "}
          <Link className="underline" href="https://github.com/dev-caspertheghost/notey.app">
            Github
          </Link>
        </p>
      </div>
    </Modal>
  );
};
