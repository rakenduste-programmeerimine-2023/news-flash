import Link from 'next/link'

export default function HomeHeader(props) {
  const loginObject = props.user === undefined ? 
    <Link className="last-child" href="/login">LOGI SISSE</Link> :
    <Link className="welcome" href="/my_profile">`Tere tulemast, {props.user}`</Link>

  return (
    <div>
      <div>
        <h1 className="newsFlash">NewsFlash</h1>
      </div>
      <nav>

        <Link href="/Majandus">Majandus</Link>
        <Link href="/Sport">Sport</Link>
        <Link href="/Maailm">Maailm</Link>
        <Link href="/Eesti">Eesti</Link>
        <Link href="/Kultuur">Kultuur</Link>
        {loginObject}

      </nav>
    </div>
  )
}