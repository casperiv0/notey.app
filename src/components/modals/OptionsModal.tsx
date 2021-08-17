import * as React from "react";
import { logout, deleteAccount } from "@actions/auth";
import Modal from "@components/modal/Modal";
import { Divider, Column, ReportBtn, Button } from "@styles/Global";
import {
  OptionsModalStyle,
  OptionsModalContent,
  OptionsModalBody,
  OptionsModalFooter,
} from "../modal/styles";
import useModalEvent from "@hooks/useModalEvent";
import { AlertModal } from "./AlertModal";
import { closeModal, openModal } from "@lib/utils";
import { ModalIds } from "@lib/constants";
import { useStore } from "store/StoreProvider";

const OptionsModal = () => {
  const btnRef = useModalEvent<HTMLAnchorElement>(ModalIds.OptionsModal);
  const store = useStore();

  async function handleLogout() {
    await logout();

    store.setUser(null);
  }

  async function handleDelete() {
    await deleteAccount();

    store.setUser(null);
    closeModal(ModalIds.AlertDeleteAccount);
  }

  return (
    <>
      <Modal style={{ zIndex: "29" }} title="Options" id={ModalIds.OptionsModal}>
        <OptionsModalStyle>
          <OptionsModalContent>
            <OptionsModalBody>
              <Column>
                <ReportBtn
                  ref={btnRef}
                  href="https://github.com/dev-caspertheghost/notey.app/issues/new?assignees=Dev-CasperTheGhost&labels=bug&template=bug_report.md&title=%5BBUG%5D+"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Report a bug
                </ReportBtn>
                <ReportBtn
                  href="https://github.com/dev-caspertheghost/notey.app/issues"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Request a feature
                </ReportBtn>
                <ReportBtn
                  href="https://github.com/dev-caspertheghost/notey.app/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  License
                </ReportBtn>
                <Button
                  onClick={() => openModal(ModalIds.ChangePin)}
                  style={{ marginBottom: "10px" }}
                  danger
                >
                  Change/set PIN code
                </Button>
                <Button style={{ marginBottom: "10px" }} danger onClick={handleLogout}>
                  Logout
                </Button>
                <Button danger onClick={() => openModal(ModalIds.AlertDeleteAccount)}>
                  Delete account?
                </Button>
                <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />

                <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
                  Icons are from <a href="https://icons.getbootstrap.com/">Bootstrap</a>
                </h3>
              </Column>
            </OptionsModalBody>
            <OptionsModalFooter>
              Made with{" "}
              <span aria-label="heart emoji" role="img">
                ❤️
              </span>{" "}
              by{" "}
              <a target="_blank" rel="noreferrer noopener" href="https://caspertheghost.me">
                CasperTheGhost
              </a>{" "}
              on{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/dev-caspertheghost/notey.app"
              >
                Github
              </a>
            </OptionsModalFooter>
          </OptionsModalContent>
        </OptionsModalStyle>

        <AlertModal
          width="650px"
          title="Delete my account"
          description="Are you sure you want to delete your account? This will delete all your notes and categories. This action cannot be undone!"
          id={ModalIds.AlertDeleteAccount}
          actions={[
            {
              name: "No, Don't delete",
              onClick: () => closeModal(ModalIds.AlertDeleteAccount),
            },
            {
              danger: true,
              name: "Yes, Delete my account",
              onClick: handleDelete,
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default OptionsModal;
