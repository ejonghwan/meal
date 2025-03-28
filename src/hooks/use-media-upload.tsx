'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import s3Image from '@/utils/S3Image'
import SortableWrap from '@/components/display/sortable-wrap'
import SortableItem from '@/components/display/sortable-item'
import ImgMedia from '@/components/fo/common/img-media'
// import Link from "next/link"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

interface FileModel {
  id: number
  file?: File
  status: 'new' | 'current' | 'delete'
  contSn?: string
  preview: string
}

interface CurrentContents {
  contSn: string
  contFilePathNm: string
}

interface MediaUploadProps {
  type?: 'image' | 'video'
  width?: string
  height?: string
  contents?: CurrentContents[]
  limit?: number
  accept?: string
  validate?: (files: File) => boolean
  addFile?: (file: File) => void
  deleteFile?: (fileIndex: number) => void
}

interface SortableElemProps {
  src: string
  handleDeleteClick: () => void
  options?: MediaUploadProps
  sortable?: boolean
  type?: 'image' | 'video'
}

const Preview = ({
  src,
  handleDeleteClick,
  sortable,
  type
}: SortableElemProps) => {
  return (
    <>
      <ImgMedia
        src={src}
        className="size-[76px] rounded-[8px] object-contain"
      />
      {!sortable && (
        <>
          {type === 'video' ? (
            <>
              <button
                type="button"
                className="absolute right-0 top-0 z-10 inline-flex size-[18px] items-center justify-center rounded-bl-[4px] rounded-tr-[8px] bg-black/70"
                onClick={() => handleDeleteClick()}
              >
                <ImgMedia
                  src="/images/icons/common/ico_x_white_02_16.svg"
                  alt="이미지 삭제"
                />
              </button>
              <button
                type="button"
                className="absolute bottom-1 left-1 size-[20px]"
              >
                <ImgMedia src="/images/common/btn_play.png" alt="비디오 재생" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="absolute right-0 top-0 z-10 inline-flex size-[18px] items-center justify-center rounded-bl-[4px] rounded-tr-[8px] bg-black/70"
              onClick={() => handleDeleteClick()}
            >
              <ImgMedia
                src="/images/icons/common/ico_x_white_02_16.svg"
                alt="이미지 삭제"
              />
            </button>
          )}
        </>
      )}
    </>
  )
}

export default function useMediaUpload(
  fileNm: string,
  options?: MediaUploadProps
) {
  const [files, setFiles] = useState<FileModel[]>([])
  const { type = 'image', contents } = options ?? {}

  console.log('type - TODO: 동영상 타입 작업필요', type)

  useEffect(() => {
    if ((contents ?? []).length > 0) {
      setFiles(
        contents?.map(
          (c, index) =>
            ({
              id: index + 1,
              contSn: c.contSn,
              status: 'current',
              preview: s3Image({ src: c.contFilePathNm })
            }) as FileModel
        ) ?? []
      )
    }
  }, [])

  const getPreview = (file: File) => {
    return URL.createObjectURL(file)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // validate가 있는경우만 체크
      if (options?.validate && !options.validate(file)) {
        return
      }

      options?.addFile && options.addFile(file)
      setFiles((files) => {
        const id = (files ?? []).length + 1
        return [
          ...files,
          { id, file, status: 'new', preview: getPreview(file) }
        ]
      })
    }
  }

  const UploadButton = () => (
    <>
      <label
        htmlFor={fileNm}
        className={`relative inline-block size-[76px] shrink-0 cursor-pointer rounded-[8px] border border-dashed border-gray6 bg-gray9 align-middle text-transparent before:absolute before:left-1/2 before:top-1/2 before:size-[20px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[url('~/public/images/icons/common/ico_plus_gray_20.svg')]`}
      >
        파일 업로드
      </label>
      <input
        type={'file'}
        name={fileNm}
        id={fileNm}
        className={'hidden'}
        accept={options?.accept}
        onChange={handleChange}
      />
    </>
  )

  const handleDelete = (file: FileModel, index: number) => {
    if (file.status === 'new') {
      setFiles(files.filter((f) => f !== file))
      options?.deleteFile && options.deleteFile(index)
    } else {
      const fileTemp = [...files].map((f) => {
        if (f === file) {
          f.status = 'delete'
        }
        return f
      })
      setFiles(fileTemp)
    }
  }

  return {
    files: files.filter((file) => file.status !== 'delete'),
    deleteFiles: files.filter((file) => file.status === 'delete'),
    Uploader: ({ sortable = false }: { sortable?: boolean }) => (
      <>
        <SortableWrap items={files} setItems={setFiles} disabled={!sortable}>
          <div className="flex items-center gap-[8px]">
            {/* 업로드 버튼 */}
            {(options?.limit === undefined ||
              files.filter((el) => el.status !== 'delete').length <
                options.limit) && <UploadButton />}

            {/* 업로드 된 이미지 */}
            <Swiper
              slidesPerView={'auto'}
              centeredSlides={false}
              className={`media-upload-swiper !ml-0`}
              modules={[Navigation]}
              navigation={true}
            >
              {files
                .filter((file) => file.status !== 'delete')
                .map((file, index) => (
                  <SwiperSlide
                    key={index}
                    className="mr-[8px] !w-[76px] last:mr-0"
                  >
                    <SortableItem id={file.id} key={`${fileNm}_${index}`}>
                      <Preview
                        src={file.preview}
                        options={options}
                        handleDeleteClick={() => handleDelete(file, index)}
                        sortable={sortable}
                        type={type}
                      />
                    </SortableItem>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </SortableWrap>
      </>
    )
  }
}
