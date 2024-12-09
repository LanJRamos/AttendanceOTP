'use client';

import { Button, Modal } from 'flowbite-react';
import ConflictTable from './ConflictTable';


const ConflictModal = ({openModal,setOpenModal,conflict})=>{

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Conflict in Shift</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              There is a conflict with the shifts. pls fix.
            </p>
            <ConflictTable/>
            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {JSON.stringify(conflict)}
            </p> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Confirm</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConflictModal