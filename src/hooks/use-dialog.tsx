import { Modal } from 'antd'
import { ReactNode, CSSProperties, useState } from 'react'
import { Button, ButtonArea } from '@/components/ui/button'
// import ImgMedia from '@/components/fo/common/img-media'

const DialogFooter = ({
  closeDialog,
  footerType
}: {
  closeDialog: () => void
  footerType?: string
}) => {
  if (footerType === 'custom') {
    return (
      <ButtonArea className="mt-7 gap-x-0">
        <Button onClick={closeDialog}>취소</Button>
        <Button onClick={closeDialog}>확인</Button>
      </ButtonArea>
    )
  } else {
    return <></>
  }
}

const styles = {
  content: {
    position: 'relative',
    boxShadow: 'none'
  } as CSSProperties,
  header: {
    textAlign: 'center',
    marginBottom: '0'
  } as CSSProperties,
  footer: {
    margin: '0'
  } as CSSProperties
}

interface DialogProps {
  title?: string
  width?: number
  className?: string
  footerType?: string
  maskClosable?: boolean
  afterOpen?: () => void
  afterClose?: () => void
  handleOk?: () => void
}
export default function useDialog({
  title = '',
  className = '',
  width,
  footerType = 'default',
  maskClosable = true,
  afterOpen = () => {},
  afterClose = () => {},
  handleOk = () => {}
}: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const closeDialog = () => {
    setDialogOpen(false)
    afterClose()
  }

  return {
    openDialog() {
      setDialogOpen(true)
    },
    closeDialog,
    Component: ({
      children,
      isFooter = true
    }: {
      children: ReactNode
      isFooter?: boolean
    }) => {
      return (
        <Modal
          open={dialogOpen}
          title={title}
          afterOpenChange={afterOpen}
          onOk={handleOk}
          onCancel={closeDialog}
          className={'modal-custom ' + className}
          styles={styles}
          centered
          closable={false}
          maskClosable={maskClosable}
          width="450px"
          okButtonProps={{ style: { display: 'none' } }}
          // closeIcon={ <ImgMedia src={ "/images/icons/ico_close18.svg" } alt="닫기" className="btn-close"/> }
          footer={
            isFooter
              ? () => (
                  <DialogFooter
                    closeDialog={closeDialog}
                    footerType={footerType}
                  ></DialogFooter>
                )
              : null
          }
        >
          {children}
        </Modal>
      )
    }
  }
}
