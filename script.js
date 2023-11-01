function getJobImageUrl(E, P) {
    const isVirtual = E.event_type === "diffusion_upsample_v5_virtual";
    const H = isVirtual ? E.parent_id : E.id;
    const PP = P ? `0_${P}` : "grid_0"
    const V = isVirtual ? `0_${E.parent_grid}` : PP;
    const path = "https://cdn.midjourney.com/"
    const finishPath = path + H + '/' + V.concat(".png")
    return finishPath
}

let allList = {}


const fetchImg = (prompt, page) => {
    let uprompt = encodeURI(prompt)
    fetch(`https://www.midjourney.com/api/app/vector-search?prompt=${uprompt}&page=${page}&_ql=explore&_qurl=https%3A%2F%2Fwww.midjourney.com%2Fexplore`, {
        "headers": {
            "x-csrf-protection": "1",
            "cookie": "__stripe_mid=03ec1883-7b11-40dd-bc4b-06a4c2ee2697092aec; AMP_MKTG_437c42b22c=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy5nb29nbGUuY29tJTJGJTIyJTJDJTIycmVmZXJyaW5nX2RvbWFpbiUyMiUzQSUyMnd3dy5nb29nbGUuY29tJTIyJTdE; customSettings_v4=%7B%22stylize%22%3A100%7D; darkMode=disabled; __Host-Midjourney.AuthUserToken=eyJpZFRva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqQmtNR1U0Tm1Ka05qUTNOREJqWVdReU5EYzFOakk0WkdFeVpXTTBPVFprWmpVeVlXUmlOV1FpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnVZVzFsSWpvaWQyRnljSE4wZFdScGJ5SXNJbTFwWkdwdmRYSnVaWGxmYVdRaU9pSTBPREptTlRGaE55MDRNV0ZrTFRRME1qVXRPRGN6TXkxbFl6azJPVEZrT1RabE9EUWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwzTmxZM1Z5WlhSdmEyVnVMbWR2YjJkc1pTNWpiMjB2WVhWMGFHcHZkWEp1WlhraUxDSmhkV1FpT2lKaGRYUm9hbTkxY201bGVTSXNJbUYxZEdoZmRHbHRaU0k2TVRZNU9EZ3dNamt5TkN3aWRYTmxjbDlwWkNJNkltVkRNMWxGU21sSFIxbG5VVTgwUm5Ga04ybE1VakF5VXpJNWJ6RWlMQ0p6ZFdJaU9pSmxRek5aUlVwcFIwZFpaMUZQTkVaeFpEZHBURkl3TWxNeU9XOHhJaXdpYVdGMElqb3hOams0T0RBMk5UazFMQ0psZUhBaU9qRTJPVGc0TVRBeE9UVXNJbVZ0WVdsc0lqb2laR1YyUUhkaGNuQmxibWRwYm1VdVlXa2lMQ0psYldGcGJGOTJaWEpwWm1sbFpDSTZkSEoxWlN3aVptbHlaV0poYzJVaU9uc2lhV1JsYm5ScGRHbGxjeUk2ZXlKa2FYTmpiM0prTG1OdmJTSTZXeUl4TVRZNE9Ea3pNelV5TXpRek56Y3pNVGczSWwwc0ltVnRZV2xzSWpwYkltUmxka0IzWVhKd1pXNW5hVzVsTG1GcElsMTlMQ0p6YVdkdVgybHVYM0J5YjNacFpHVnlJam9pWkdselkyOXlaQzVqYjIwaWZYMC5hanYzV1MxeFdmTElfT3VYLW5WV0ZGLUhEamR1YTFXQkNMVHV6SklBM054OURRRkpQRFY0TEowM2FxcWVYVkFUcGVyS1Y2Q1l6TUR4cUFTaGFJYklaQk1NVWhWMGFiNXBfS2VhZ1k5a2dpbUJKRUhCSkM4cEdheXdUQjR0V1RoaGc5TmVUM012bTd0R1dMRkxKcVJmVmxmcVdHWEFtejNOaTBVZ2dVNjYtTmJpQ2NobHB5OFRyM2pfYU9seXNyUkJsbmZqUUU3eTZ4ZTdxc3NCNUI2a1R4clVEMGd1MzktLW9OejFtcHdjMG5rTlNmX1JNQ0RPM3E3OEFCVzdaQzllNDBoOVVIY2lxZkFtTi1pY2xHZ2htWTdyRDJ2UjMzaTl5RzZnazJtampqUDVBS0Q3RXliT0JXMHVzbjJqczlNV0hnWGVlTURONWM4VnlVbDg2ZlBWV2ciLCJyZWZyZXNoVG9rZW4iOiJBTWYtdkJ4Zm56c21fdU5QNlBPQ01kVUdYN0J3LUtLSFhvRDFaNG9QMmh4ZkJEQS1NaGMxRTkxcVkzMnUySTFrMkxmZEFpSFEyTTVtNnBJeVltVlc1MnJDVTdYT2tjU0J5eS1yYkNlRnpZUktpWUwxQXp3LV9vM2lzV1c1NDBqRVg1TmFmU01RTFFia1dIelRGSTlBU3NfdlJFNHVUSkRoQ0p5aFpwV3FESXpUOXh4SFdPZ01jM1kzNkJaTFBYZ2Njc0RJOGNmWGNGSHM3R3Y3TURJaHZwR0RfbzFZR1ZQWEw2UWYwMjdMb1JVc2t5di1iNkZiQmNCQ2Q4cGtIcllLUlV6NThSUlZIVFJIIn0; __Host-Midjourney.AuthUserToken.sig=P7zU9gBMv720yfa90WSZWrrHGd9vurVi-VuQuXhKo_0; __Host-Midjourney.AuthUser=eyJpZCI6ImVDM1lFSmlHR1lnUU80RnFkN2lMUjAyUzI5bzEiLCJtaWRqb3VybmV5X2lkIjoiNDgyZjUxYTctODFhZC00NDI1LTg3MzMtZWM5NjkxZDk2ZTg0IiwiZW1haWwiOiJkZXZAd2FycGVuZ2luZS5haSIsImVtYWlsVmVyaWZpZWQiOnRydWUsInBob25lTnVtYmVyIjpudWxsLCJkaXNwbGF5TmFtZSI6IndhcnBzdHVkaW8iLCJwaG90b1VSTCI6bnVsbCwiYWJpbGl0aWVzIjp7ImFkbWluIjpmYWxzZSwiZGV2ZWxvcGVyIjpmYWxzZSwiYWNjZXB0ZWRfdG9zIjp0cnVlLCJtb2RlcmF0b3IiOmZhbHNlLCJndWlkZSI6ZmFsc2UsImNvbW11bml0eSI6ZmFsc2UsInZpcCI6ZmFsc2UsImVtcGxveWVlIjpmYWxzZSwiYWxsb3dfbnNmdyI6ZmFsc2UsInRlc3RlciI6ZmFsc2UsImNvb2xkb3duc19yZW1vdmVkIjpmYWxzZSwiYmxvY2tlZCI6ZmFsc2UsImNhbl90ZXN0IjpmYWxzZSwiaXNfc3Vic2NyaWJlciI6dHJ1ZSwiY2FuX3ByaXZhdGUiOmZhbHNlLCJjYW5fcmVsYXgiOmZhbHNlLCJpc190cmlhbCI6ZmFsc2V9LCJ3ZWJzb2NrZXRBY2Nlc3NUb2tlbiI6ImV5SjFjMlZ5WDJsa0lqb2lORGd5WmpVeFlUY3RPREZoWkMwME5ESTFMVGczTXpNdFpXTTVOamt4WkRrMlpUZzBJaXdpZFhObGNtNWhiV1VpT2lKM1lYSndjM1IxWkdsdklpd2lhV0YwSWpveE5qazRPREEyTlRrMWZRLmZ3OFBHNkF6dTJjcll3YXZ3dzlxb2lTVDFzSVV2a0gzVkd5QVRoRUsteEkifQ==; cf_clearance=NAjbRSk9YOZSWKRgJKKjP_gIjGIyxYFCotOLy9IBfOc-1698809900-0-1-f452faf9.81a8873d.a353a519-0.2.1698809900; AMP_437c42b22c=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjI4NWE3Mzk2OS00Yjk4LTQ4NGMtODU2Yi0xNzY3ZTMxNjkwZTYlMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjI0ODJmNTFhNy04MWFkLTQ0MjUtODczMy1lYzk2OTFkOTZlODQlMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNjk4ODA5NzI4MTMzJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTY5ODgwOTk2OTQzMSUyQyUyMmxhc3RFdmVudElkJTIyJTNBMzclN0Q=; __cf_bm=kYaUulmztpGM2Rg991Hrhpxh0dKaLcPacvuZsicDwHM-1698810115-0-AT5TX9sAQSEnJaBvxG9nDK+MoNTagIflxT6j7LfG8xzdXsM7FR0CyhbhDrNKQYEjOKtMo3iyAiwpxYNhFPEJt/A=",
            "Referer": "https://www.midjourney.com/explore",
            "Referrer-Policy": "origin-when-cross-origin"
        },
        "body": null,
        "method": "GET",
    }).then(res => res.json()).then(res => {
        let newList = res.jobs.map((item) => {
            let url = getJobImageUrl(item, null)
            let { full_command } = item;
            return { full_command, url };
        });
        allList[prompt] = [...allList[prompt], newList]
    }
    )
}


const characterList = [
    "a man, full body",
    "a woman, full body",
    "a girl, full body",
    "a boy, full body",
    "a lady, full body",
    "an old man, full body",
    "an old woman, full body",
    "game character, full body",
    "anime, full body",
    "Marvel, full body, solo",
    "CG character, full body",
    "3D style, full body",
    "film character, full body",
    "an athlete, full body",
    "science fiction character, full body",
    "cyberpunk character, full body",
    "comic character, full body",
    "an ancient character, full body",
    "Renaissance character, full body",
    "overwatch, full body, solo",
    "fortnite character, full body",
    "GTA, full body",
    "disney, full body"
];


characterList.map((item) => {
    allList[item] = []
    for (let i = 0; i <= 1; i++) {
        fetchImg(item, i)
    }
})