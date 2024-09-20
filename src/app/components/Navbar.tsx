'use client'

import { useState } from 'react'
import { asLink, Content } from '@prismicio/client'
import WordMark from './Wordmark'
import Link from 'next/link'
import { PrismicNextLink } from '@prismicio/next'
import ButtonLink from '@/app/components/ButtonLink'
import { MdMenu, MdClose } from 'react-icons/md'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

type NavbarProps = {
    settings: Content.SettingsDocument
}

export default function Navbar({ settings }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <nav className='px-4 py-4 md:px-6 md:py-6' aria-label="Main">
            <div className='mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-[#f3f3f3] md:flex-row md:items-center'>

                <div className="flex items-center justify-between">

                    <Link
                        href={'/'}
                        className='z-50'
                        onClick={() => setOpen(false)}>
                        <WordMark />
                    </Link>
                    <button
                        type='button'
                        className='block p-2 text-3xl text-white md:hidden'
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <MdMenu />
                        <span className='sr-only'>Open menu</span>
                    </button>
                </div>

                {/*mobile nav */}
                <div className={clsx('fixed bottom-0 right-0 left-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
                    open ? "translate-x-0" : "translate-x-[100%]"
                )}>
                    <button
                        type='button'
                        className='block p-2 text-3xl text-white md:hidden fixed right-4 top-4 mb-4'
                        aria-expanded={open}
                        onClick={() => setOpen(false)}
                    >
                        <MdClose />
                        <span className='sr-only'>Close menu</span>
                    </button>

                    <div className="grid justify-items-end gap-8">
                        {settings.data.navigation.map((item) => {
                            if (item.cta_button) {
                                return (
                                    <ButtonLink
                                        key={item.label}
                                        field={item.link}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            pathname.includes(asLink(item.link) as string) ? "page" : undefined
                                        }
                                    >
                                        {item.label}
                                    </ButtonLink>
                                )
                            }
                            return (
                                <PrismicNextLink
                                    key={item.label}
                                    className='px-3 block text-3xl first:mt-8'
                                    field={item.link}
                                    onClick={() => setOpen(false)}
                                    aria-current={
                                        pathname.includes(asLink(item.link) as string)
                                            ? "page" : undefined
                                    }
                                >
                                    {item.label}
                                </PrismicNextLink>
                            )
                        })}
                    </div>
                </div>


                {/*Desktop nav */}
                <ul className="hidden md:flex gap-6">
                    {settings.data.navigation.map((item) => {

                        if (item.cta_button) {
                            return (
                                <li key={item.label}>
                                    <ButtonLink key={item.label}
                                        field={item.link}
                                        aria-current={
                                            pathname.includes(asLink(item.link) as string)
                                                ? "page" : undefined
                                        }
                                    >
                                        {item.label}
                                    </ButtonLink>
                                </li>
                            )
                        }

                        return (
                            <li key={item.label}>
                                <PrismicNextLink
                                    field={item.link}
                                    className="inline-flex min-h-11 items-center"
                                >
                                    {item.label}
                                </PrismicNextLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav >
    )
}