import React from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Column, ReportBtn, Button } from "../../styles/Global";
import {
  OptionsModalStyle,
  OptionsModalContent,
  OptionsModalBody,
  OptionsModalFooter,
} from "../../styles/Modal";

const OptionsModal = ({ logout }) => {
  return (
    <Modal title="Options" id="optionsModal">
      <OptionsModalStyle>
        <OptionsModalContent>
          <OptionsModalBody>
            <Column>
              <ReportBtn
                href="https://github.com/notey-app/notey.app/issues/new?assignees=Dev-CasperTheGhost&labels=bug&template=bug_report.md&title=%5BBUG%5D+"
                target="_blank"
                rel="noreferrer noopener"
              >
                Report a bug
              </ReportBtn>
              <ReportBtn
                href="https://github.com/notey-app/notey.app/issues"
                target="_blank"
                rel="noreferrer noopener"
              >
                Request a feature
              </ReportBtn>
              <Button danger onClick={logout}>
                Logout
              </Button>
            </Column>
          </OptionsModalBody>
          <OptionsModalFooter>
            Made with ❤ by{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://caspertheghost.me"
            >
              CasperTheGhost
            </a>{" "}
            on{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/notey-app/notey.app"
            >
              Github
            </a>
          </OptionsModalFooter>
        </OptionsModalContent>
      </OptionsModalStyle>
    </Modal>
  );
};

export default connect(null, { logout })(OptionsModal);
