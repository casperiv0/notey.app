import React from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { openModal } from "../../utils/functions";
import { logout, deleteAccount } from "../../actions/auth";
import { Divider, Column, ReportBtn, Button } from "../../styles/Global";
import {
  OptionsModalStyle,
  OptionsModalContent,
  OptionsModalBody,
  OptionsModalFooter,
} from "./modal.style";

const OptionsModal = ({ logout, deleteAccount }) => {
  function confirmDeleteAccount() {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This will delete all your notes and categories as well and cannot be undone.",
      )
    ) {
      deleteAccount();
    }
  }

  function openSetPin() {
    openModal("setPinModal");
  }

  return (
    <Modal style={{ zIndex: "29" }} title="Options" id="optionsModal">
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
              <ReportBtn
                href="https://github.com/notey-app/notey.app/blob/master/LICENSE"
                target="_blank"
                rel="noreferrer noopener"
              >
                License
              </ReportBtn>
              <Button style={{ marginBottom: "10px" }} danger onClick={openSetPin}>
                Change/set PIN code
              </Button>
              <Button style={{ marginBottom: "10px" }} danger onClick={logout}>
                Logout
              </Button>
              <Button danger onClick={confirmDeleteAccount}>
                Delete account?
              </Button>
              <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>

              <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
                Icons are from <a href="https://icons.getbootstrap.com/">Bootstrap</a>
              </h3>
            </Column>
          </OptionsModalBody>
          <OptionsModalFooter>
            Made with ❤️ by{" "}
            <a target="_blank" rel="noreferrer noopener" href="https://caspertheghost.me">
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

export default connect(null, { logout, deleteAccount })(OptionsModal);
