import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from 'react';
import { useGetCuratorsData, useRegisterCurator, useDeleteCurator } from '../../ViewModel/useCuratorsViewModel';
import LoadingSpinner from '../LoadingSpinner';
import Modal from 'react-modal';
import TextInput from '../TextInput';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%'
  },
};

const UserManagement: React.FC = () => {
  const [list, fetchNextPage, isFetchingNextPage, refetch] = useGetCuratorsData();
  const { register, error, success } = useRegisterCurator();
  const { deleteCurator, errorOnDelete, successOnDelete } = useDeleteCurator();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setUser({
      name: "",
      email: "",
      password: "",
    });
  }

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register.mutateAsync({ user })
    .then(() => {
      refetch();
      closeModal();
      notifySuccess();
    }).catch(() => notifyError());
  };

  const notifySuccess = () => toast.success("Operação realizada");
  const notifyError = () => toast.error("Não foi possivel completar a operação");

  const deleteCuratorFn = (id: number) => {
    const options = {
      title: 'Tem certeza que deseja excluir?',
      message: 'A exclusão de um curador não poderá ser desfeita.',
      buttons: [
        {
          label: 'Sim, excluir.',
          onClick: () => {
            deleteCurator.mutateAsync(id)
            .then(() => notifySuccess())
            .catch(() => notifyError());
          }
        },
        {
          label: 'Não, cancelar.',
          onClick: () => { }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => { },
      afterClose: () => { },
      onClickOutside: () => { },
      onKeypress: () => { },
      onKeypressEscape: () => { },
      overlayClassName: "overlay-custom-class-name"
    };

    confirmAlert(options);
  }

  return (
    <>
      <div className='px-16 py-8'>
        <div className='flex justify-between'>
          <span className='font-bold'>Curadores BEM</span>
          {/* {(error || errorOnDelete) && (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-2 text-pink-500"
            >
              Não foi possivel completar a operação
            </motion.p>
          )}
          {(success || successOnDelete) && (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-2 text-emerald-500"
            >
              Operação realizada
            </motion.p>
          )} */}
          <motion.button
            className="rounded bg-emerald-500 px-4 py-2 text-white"
            whileHover={{ scale: 1.1, backgroundColor: "#34d399" }}
            onClick={() => openModal()}
          >
            Novo
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list?.map((page: any) =>
            page?.content?.map((user: any) => (
              <motion.div
                key={user.id}
                className="overflow-hidden rounded-lg bg-white shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-4">
                  <h2 className="text-lg font-bold">
                    {user.name}
                  </h2>
                  <div className="mt-4 flex justify-between">
                    <motion.button
                      className="rounded bg-pink-500 px-4 py-2 text-white"
                      whileHover={{ scale: 1.1, backgroundColor: "#f472b6" }} // Lighter pink on hover
                      onClick={() => deleteCuratorFn(user.id)}
                    >
                      Excluir
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )),
          ) ?? (
              <div className="text-center text-xl text-gray-500">
                Nenhum curador cadastrado.
              </div>
            )}
          {isFetchingNextPage ? <LoadingSpinner /> : <div ref={ref}></div>}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal de cadastro de curador"
      >
        <div className='flex flex-col gap-8'>
          <div className='flex justify-between'>
            <h2>Cadastro de curador</h2>
            <button onClick={closeModal}>x</button>
          </div>
          <form
            className='flex flex-col gap-8'
            action="#"
            method="POST"
            onSubmit={handleFormSubmit}
          >
            <TextInput
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={user.name}
              placeholder=" "
              onChange={(newValue) =>
                setUser({ ...user, name: newValue })
              }
              label="Nome"
            />
            <TextInput
              id="email"
              name="email"
              type="e-mail"
              autoComplete="e-mail"
              required
              value={user.email}
              placeholder=" "
              onChange={(newValue) =>
                setUser({ ...user, email: newValue })
              }
              label="E-mail"
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              value={user.password}
              placeholder=" "
              onChange={(newValue) =>
                setUser({ ...user, password: newValue })
              }
              label="Senha"
            />
            <motion.button
              className="rounded bg-emerald-500 px-4 py-2 text-white"
              whileHover={{ scale: 1.02, backgroundColor: "#34d399" }}
              type="submit"
            >
              Cadastrar
            </motion.button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UserManagement;