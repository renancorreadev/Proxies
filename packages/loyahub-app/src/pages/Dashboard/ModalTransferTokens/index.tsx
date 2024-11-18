import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useTokenTransfer } from '@/hooks/';
import { toast } from 'sonner';
import { useModal } from '@/context/modal-provider';

interface ModalTransferTokensProps {
  email: string;
  onTransferSuccess?: () => void;
}

export const ModalTransferTokens: React.FC<ModalTransferTokensProps> = ({
  email,
  onTransferSuccess,
}) => {
  const { isOpen, closeModal } = useModal();
  const { transferTokens, loading: transferLoading } = useTokenTransfer();

  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState<string>(''); // Inicialmente vazio

  const handleTransfer = async () => {
    if (!email || !recipientAddress || !transferAmount) {
      toast.error('Preencha todos os campos!');
      return;
    }

    try {
      await transferTokens({
        email,
        to: recipientAddress,
        amount: Number(transferAmount),
      });
      toast.success('Transferência realizada com sucesso!');
      setRecipientAddress('');
      setTransferAmount('');
      closeModal();
      onTransferSuccess?.();
    } catch (err) {
      console.error('Erro ao transferir:', err);
      toast.error('Erro ao realizar a transferência.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Transferir Tokens"
      footer={
        <button
          onClick={handleTransfer}
          disabled={transferLoading}
          className={`w-full p-3 rounded-lg font-bold transition-all ${
            transferLoading
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-600 text-white'
          }`}
        >
          {transferLoading ? 'Transferindo...' : 'Confirmar Transferência'}
        </button>
      }
    >
      <div>
        <label
          htmlFor="recipientAddress"
          className="block text-sm text-gray-300 mb-2"
        >
          Endereço do Destinatário
        </label>
        <input
          id="recipientAddress"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Insira o endereço do destinatário"
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="transferAmount"
          className="block text-sm text-gray-300 mb-2"
        >
          Quantidade de Tokens
        </label>
        <input
          id="transferAmount"
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Digite o valor"
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>
    </Modal>
  );
};
