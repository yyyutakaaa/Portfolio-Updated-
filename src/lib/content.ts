/**
 * Alle tekstuele inhoud van de site op één plek.
 * Nederlands, rustige toon, concrete cijfers. Vervangbaar zonder aan de code te komen.
 */

export const PERSON = {
  name: 'Mehdi Oulad Khlie',
  role: 'IT-infrastructuur in opleiding',
  location: 'Evergem, België',
  locationShort: 'EVERGEM, BE',
  email: 'mehdi.ouladkhlie@outlook.be',
  linkedin: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/',
  github: 'https://github.com/yyyutakaaa',
  site: 'https://www.mehdioul.dev/',
  timezone: 'Europe/Brussels',
} as const;

export const HERO = {
  eyebrow: 'PORTFOLIO — INFRASTRUCTUUR',
  /** Bewust korte regels: elke regel is één clip-path reveal. */
  headline: ['Ik bouw', 'en beveilig', 'infrastructuur.'],
  support:
    'Windows Server, Entra ID, Microsoft 365 en de netwerken eronder. Van tenant tot endpoint, van firewallregel tot PowerShell-script.',
  status: {
    label: 'SESSIE',
    rows: [
      { k: 'LOCATIE', v: 'Evergem, BE' },
      { k: 'OPLEIDING', v: 'Graduaat Systeem- & Netwerkbeheer — HOGENT' },
      { k: 'BESCHIKBAAR', v: 'Stage vanaf feb 2027' },
      { k: 'BEZIG MET', v: 'AZ-900 · MD-102 · CCNA 200-301' },
    ],
  },
  scrollHint: 'SCROLL — DE TOPOLOGIE VOLGT',
} as const;

export const SYSTEM = {
  index: '01',
  title: 'Systeem',
  /** Tweede persoon: het beschrijft het leerproces, niet de persoon. */
  intro: [
    'Je leert dit vak niet uit een handboek. Je zet een domeincontroller op, je breekt hem, en je zoekt in de eventlogs uit waarom.',
    'Je rolt een Conditional Access-policy uit en merkt pas achteraf dat je jezelf hebt buitengesloten. Daarna schrijf je het script dat het de volgende keer in één keer goed doet.',
    'Zo groeit het: fout na fout, tot het klopt.',
  ],
  note: 'Alles hieronder heb ik zelf opgezet, stukgemaakt en weer werkend gekregen. Meestal in die volgorde.',
  domainsLabel: 'EXPERTISE-INDEX',
  domains: [
    {
      id: 'identity',
      no: 'D-01',
      name: 'Identity & Access',
      stack: 'Entra ID · Conditional Access · MFA',
      detail:
        'Vier Conditional Access-policies in een eigen tenant, met een break-glass-account dat er bewust buiten valt.',
    },
    {
      id: 'endpoint',
      no: 'D-02',
      name: 'Endpoint Management',
      stack: 'Intune · Autopilot · Compliance',
      detail:
        'Twaalf testtoestellen via Autopilot uitgerold, met compliance-policies die BitLocker en Defender afdwingen.',
    },
    {
      id: 'm365',
      no: 'D-03',
      name: 'Microsoft 365',
      stack: 'Exchange Online · SharePoint · Purview',
      detail:
        'Mailflowregels, gedeelde postbussen en retentielabels opgezet — en daarna getest of ze doen wat ik dacht.',
    },
    {
      id: 'network',
      no: 'D-04',
      name: 'Netwerk',
      stack: 'VLANs · Routing · Firewalling · VPN',
      detail:
        'Vijf VLANs met inter-VLAN routing op een L3-switch, plus regels die IoT van de rest gescheiden houden.',
    },
    {
      id: 'virt',
      no: 'D-05',
      name: 'Virtualisatie & Backup',
      stack: 'Hyper-V · Veeam CE · NAS',
      detail:
        'Eén host, vier VM\u2019s, wekelijkse backups naar NAS — en een restore die ik echt heb uitgevoerd, niet alleen ingepland.',
    },
    {
      id: 'automation',
      no: 'D-06',
      name: 'Automatisering',
      stack: 'PowerShell 7 · Microsoft Graph',
      detail:
        'Onboarding-script dat een account aanmaakt, een licentie toekent en de juiste groepen invult via Graph.',
    },
  ],
} as const;

export type Domain = (typeof SYSTEM)['domains'][number];

export interface CaseBlock {
  k: string;
  v: string;
}

export interface CaseStudy {
  id: string;
  no: string;
  slug: string;
  title: string;
  lede: string;
  period: string;
  stack: string[];
  context: string;
  problem: string;
  approach: string[];
  result: string;
  /** Het cijfer dat blijft hangen bij 40 seconden scannen. */
  metrics: { value: string; unit: string; label: string }[];
  /** Tekstuele weergave van het diagram — draagt de betekenis voor screenreaders. */
  components: string[];
  diagramAlt: string;
  code: {
    label: string;
    lang: 'powershell' | 'cisco';
    filename: string;
    source: string;
  };
}

export const CASES: CaseStudy[] = [
  {
    id: 'homelab',
    no: '01',
    slug: 'HOMELAB',
    title: 'Een hybride lab op één host',
    lede: 'Windows Server, Hyper-V en Entra ID op hardware die eigenlijk te klein is.',
    period: '2025 — HEDEN',
    stack: ['Windows Server 2022', 'Hyper-V', 'Entra Connect', 'OPNsense'],
    context:
      'Ik wilde Active Directory, DNS en hybride identiteit kunnen oefenen zonder ergens een productieomgeving te raken. Wat ik had: één tweedehands machine met 32 GB RAM en een switch die geen VLANs kende.',
    problem:
      'Een lab dat je één keer opzet en daarna bang bent om te breken, is geen lab. Elke keer dat ik iets stuk maakte — een verkeerde DNS-forwarder, een verlopen certificaat — kostte het me een halve avond om terug te komen waar ik was. Daardoor durfde ik steeds minder te proberen.',
    approach: [
      'Alles op één Hyper-V-host: DC01 (AD DS + DNS), FS01 (fileserver + DFS), WSUS voor updates en een Windows 11-client om vanaf te testen.',
      'De host achter een OPNsense-firewall gezet, met de switch vervangen door een beheerbaar model zodat VLANs mogelijk werden.',
      'Entra Connect in staged mode uitgerold, zodat ik hybride identiteit kon testen zonder dat mijn labaccounts in de echte tenant terechtkwamen.',
      'Het belangrijkste stuk: een PowerShell-script dat de hele lab-topologie opnieuw opbouwt vanaf een schone Windows Server ISO. Checkpoints zijn de vangnet, het script is de reset-knop.',
    ],
    result:
      'Sinds het herbouwscript er is, is stukmaken goedkoop geworden. Een volledige reset duurt 18 minuten in plaats van een halve avond, en ik heb het inmiddels vaker gebruikt dan me lief is.',
    metrics: [
      { value: '18', unit: 'min', label: 'volledige herbouw van het lab' },
      { value: '4', unit: 'VM\u2019s', label: 'op één host, 32 GB RAM' },
      { value: '11', unit: '×', label: 'lab herbouwd zonder handwerk' },
    ],
    components: [
      'WAN → OPNsense (firewall, DHCP, DNS-forward)',
      'SW-CORE (L2, VLAN-trunk naar de host)',
      'VLAN10 MGMT · VLAN20 SERVER · VLAN30 CLIENT',
      'HV01 — Hyper-V-host, 32 GB RAM',
      'DC01 (AD DS, DNS) · FS01 (DFS) · WSUS · WIN11-01',
      'NAS — backupdoel, VLAN10',
      'Entra ID — hybride sync via Entra Connect (staged)',
    ],
    diagramAlt:
      'Netwerkdiagram van het homelab: WAN naar OPNsense-firewall, naar een core switch die drie VLANs voedt. De Hyper-V-host draagt vier virtuele machines; DC01 synchroniseert via Entra Connect naar Entra ID.',
    code: {
      label: 'Herbouwscript — VM-provisioning',
      lang: 'powershell',
      filename: 'New-LabTopology.ps1',
      source: `<#
    Bouwt de lab-VM's opnieuw op vanaf een schone ISO.
    Idempotent: bestaande VM's worden overgeslagen, niet overschreven.
#>
[CmdletBinding()]
param(
    [string] $VmPath  = 'D:\\Hyper-V',
    [string] $IsoPath = 'D:\\ISO\\WinServer2022.iso',
    [string] $Switch  = 'vSwitch-LAB'
)

$Machines = @(
    @{ Name = 'DC01';     Memory = 4GB; Disk = 80GB;  Vlan = 20 }
    @{ Name = 'FS01';     Memory = 4GB; Disk = 200GB; Vlan = 20 }
    @{ Name = 'WSUS01';   Memory = 6GB; Disk = 250GB; Vlan = 20 }
    @{ Name = 'WIN11-01'; Memory = 8GB; Disk = 120GB; Vlan = 30 }
)

foreach ($m in $Machines) {
    if (Get-VM -Name $m.Name -ErrorAction SilentlyContinue) {
        Write-Verbose "$($m.Name) bestaat al - overslaan"
        continue
    }

    $vhd = Join-Path $VmPath "$($m.Name)\\$($m.Name).vhdx"

    New-VM -Name $m.Name \`
           -Generation 2 \`
           -MemoryStartupBytes $m.Memory \`
           -NewVHDPath $vhd \`
           -NewVHDSizeBytes $m.Disk \`
           -SwitchName $Switch | Out-Null

    # Dynamisch geheugen: de host heeft er maar 32 GB en vier gasten.
    Set-VMMemory -VMName $m.Name -DynamicMemoryEnabled $true \`
                 -MinimumBytes 2GB -MaximumBytes $m.Memory

    Set-VMProcessor  -VMName $m.Name -Count 2
    Set-VMFirmware   -VMName $m.Name -EnableSecureBoot On
    Add-VMDvdDrive   -VMName $m.Name -Path $IsoPath

    # Boot van DVD, anders loopt de eerste start dood op "no bootable device".
    $dvd = Get-VMDvdDrive -VMName $m.Name
    Set-VMFirmware -VMName $m.Name -FirstBootDevice $dvd

    Set-VMNetworkAdapterVlan -VMName $m.Name -Access -VlanId $m.Vlan

    Write-Host "[+] $($m.Name) aangemaakt op VLAN $($m.Vlan)"
}

Get-VM | Sort-Object Name | Format-Table Name, State, MemoryAssigned`,
    },
  },
  {
    id: 'tenant',
    no: '02',
    slug: 'TENANT',
    title: 'Conditional Access zonder jezelf buiten te sluiten',
    lede: 'Een tenant dichtzetten is makkelijk. Hem daarna nog binnen raken is het echte werk.',
    period: '2026',
    stack: ['Entra ID', 'Conditional Access', 'Intune', 'Microsoft Graph'],
    context:
      'Een testtenant met veertien accounts, opgezet om te leren hoe Conditional Access zich echt gedraagt — niet hoe de documentatie zegt dat het zich gedraagt.',
    problem:
      'De eerste policy die ik uitrolde eiste een compliant device van iedereen. Inclusief mijzelf, op een toestel dat nog niet in Intune stond. Vijf minuten later kon niemand meer inloggen, ikzelf het eerst. Dat is precies de fout die je in een productieomgeving niet één keer mag maken.',
    approach: [
      'Eerst een break-glass-account: cloud-only, lange willekeurige wachtwoordzin, uitgesloten van élke policy, en gemonitord met een alert bij gebruik.',
      'Elke policy eerst in report-only. Twee weken meekijken in de sign-in logs voordat er iets afgedwongen werd.',
      'Vier policies met een duidelijke taakverdeling: MFA voor alle gebruikers, legacy authentication blokkeren, compliant device eisen voor toegang tot Exchange en SharePoint, en aanmeldingen van buiten de EER blokkeren.',
      'De policies via Microsoft Graph aangemaakt in plaats van via de portal, zodat de configuratie in Git staat en ik kan zien wat er wanneer veranderd is.',
    ],
    result:
      'Legacy authentication staat op nul, MFA geldt voor alle veertien accounts en de uitrol verliep zonder één lockout — omdat de report-only fase drie policies aan het licht bracht die te breed stonden.',
    metrics: [
      { value: '14', unit: '/14', label: 'accounts met MFA afgedwongen' },
      { value: '0', unit: '', label: 'lockouts tijdens de uitrol' },
      { value: '3', unit: '', label: 'te brede policies gevangen in report-only' },
    ],
    components: [
      'Tenant — 14 accounts, testomgeving',
      'Entra ID — identity provider',
      'CA-01 MFA · CA-02 GEO-BLOCK · CA-03 COMPLIANT · CA-04 LEGACY-BLOCK',
      'Break-glass-account — uitgesloten van alle policies',
      'Intune — leverancier van het compliance-signaal',
      'Exchange Online · SharePoint Online — beschermde resources',
      'Drie geregistreerde endpoints',
    ],
    diagramAlt:
      'Diagram van de tenant: Entra ID in het midden, met vier Conditional Access-policies die samenkomen op de gebruikersgroep, drie endpoints eronder, en Intune, Exchange Online en SharePoint als aangesloten diensten.',
    code: {
      label: 'Policy als code — via Microsoft Graph',
      lang: 'powershell',
      filename: 'New-CaPolicy-RequireMfa.ps1',
      source: `<#
    CA-01 : MFA voor alle gebruikers.
    Start altijd in enabledForReportingButNotEnforced.
    Zet 'm pas op 'enabled' als de sign-in logs schoon zijn.
#>
Connect-MgGraph -Scopes 'Policy.ReadWrite.ConditionalAccess',
                        'Policy.Read.All' -NoWelcome

# Break-glass mag nooit onder een policy vallen.
$breakGlass = (Get-MgUser -Filter "startsWith(userPrincipalName,'bg-admin')").Id
if (-not $breakGlass) { throw 'Break-glass-account niet gevonden - gestopt.' }

$params = @{
    displayName = 'CA-01 | Vereis MFA voor alle gebruikers'
    state       = 'enabledForReportingButNotEnforced'
    conditions  = @{
        users = @{
            includeUsers = @('All')
            excludeUsers = @($breakGlass)
        }
        applications  = @{ includeApplications = @('All') }
        clientAppTypes = @('browser', 'mobileAppsAndDesktopClients')
    }
    grantControls = @{
        operator        = 'OR'
        builtInControls = @('mfa')
    }
}

$policy = New-MgIdentityConditionalAccessPolicy -BodyParameter $params

[pscustomobject]@{
    Naam   = $policy.DisplayName
    Status = $policy.State
    Id     = $policy.Id
} | Format-List

Write-Warning 'Report-only actief. Controleer 14 dagen sign-in logs voor je afdwingt.'`,
    },
  },
  {
    id: 'segment',
    no: '03',
    slug: 'SEGMENTATIE',
    title: 'Vijf VLANs en een firewall die nee zegt',
    lede: 'Een plat netwerk werkt prima, tot één slim stopcontact het niet meer is.',
    period: '2025 — 2026',
    stack: ['Cisco IOS', 'OPNsense', 'inter-VLAN routing', '802.1Q'],
    context:
      'Thuis liep alles op één subnet: labservers, laptops, een printer, een handvol IoT-toestellen en de tv. Dat werkt, tot je bedenkt dat een goedkope wifi-stekker in dezelfde broadcastdomein zit als de domeincontroller.',
    problem:
      'Op een plat netwerk kan elk toestel elk ander toestel bereiken. Toen ik met Wireshark meekeek, zag ik IoT-toestellen die het hele subnet afscanden en een printer die om de paar seconden broadcastte. Er was geen enkele grens tussen "speelgoed" en "de dingen die moeten blijven werken".',
    approach: [
      'Vijf VLANs gedefinieerd op basis van vertrouwen, niet op basis van kamer: MGMT, CLIENT, SERVER, IOT en GUEST.',
      'Inter-VLAN routing op de L3-switch, met de firewall als default gateway voor alles wat het segment verlaat.',
      'Standaard deny tussen segmenten. Verkeer moet expliciet toegelaten worden, niet expliciet geblokkeerd — dat scheelt vergeten regels.',
      'IoT kreeg internet en verder niets. GUEST kreeg client isolation. Beheer van de switch en de firewall kan alleen nog vanuit MGMT.',
    ],
    result:
      'IoT en gasten zien de rest van het netwerk niet meer. Wat vroeger één broadcastdomein met 31 toestellen was, zijn nu vijf segmenten waarvan het grootste er 12 bevat — en beheerinterfaces zijn vanuit precies één VLAN bereikbaar.',
    metrics: [
      { value: '5', unit: 'VLANs', label: 'gescheiden op vertrouwensniveau' },
      { value: '23', unit: '', label: 'expliciete firewallregels, default deny' },
      { value: '1', unit: '', label: 'VLAN met toegang tot beheerinterfaces' },
    ],
    components: [
      'ISP → OPNsense (default gateway, NAT, DNS)',
      'SW-L3 — 802.1Q trunk, inter-VLAN routing',
      'VLAN10 MGMT (10.10.10.0/24) — switch, firewall, NAS',
      'VLAN20 CLIENT (10.10.20.0/24) — laptops, telefoons',
      'VLAN30 SERVER (10.10.30.0/24) — Hyper-V-host, VM\u2019s',
      'VLAN40 IOT (10.10.40.0/24) — alleen uitgaand internet',
      'VLAN99 GUEST (10.10.99.0/24) — client isolation',
      'Regelset — default deny tussen alle segmenten',
    ],
    diagramAlt:
      'Netwerkdiagram met vijf VLANs: van de ISP naar de firewall, naar een layer 3-switch die vijf gescheiden segmenten voedt, elk met de bijbehorende toestellen. Een regelset bepaalt wat tussen segmenten mag.',
    code: {
      label: 'Switchconfiguratie — VLANs en trunk',
      lang: 'cisco',
      filename: 'sw-core-01.cfg',
      source: `! ------------------------------------------------------------
!  SW-CORE-01  |  segmentatie op vertrouwensniveau
! ------------------------------------------------------------
vlan 10
 name MGMT
vlan 20
 name CLIENT
vlan 30
 name SERVER
vlan 40
 name IOT
vlan 99
 name GUEST
!
! Uplink naar de firewall - draagt alle segmenten
interface GigabitEthernet0/1
 description UPLINK --> FW-01
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,99
 switchport nonegotiate
!
! Hyper-V-host: trunk, VM's kiezen zelf hun VLAN
interface GigabitEthernet0/2
 description HV01 --> vSwitch-LAB
 switchport mode trunk
 switchport trunk allowed vlan 20,30
!
! IoT-poorten: access, geen negotiation, storm control
interface range GigabitEthernet0/13 - 20
 description IOT
 switchport mode access
 switchport access vlan 40
 switchport nonegotiate
 spanning-tree portfast
 spanning-tree bpduguard enable
 storm-control broadcast level 2.00
!
! Beheer is alleen bereikbaar vanuit MGMT.
interface Vlan10
 description BEHEER
 ip address 10.10.10.2 255.255.255.0
!
ip access-list standard VTY-MGMT
 permit 10.10.10.0 0.0.0.255
 deny   any log
!
line vty 0 4
 access-class VTY-MGMT in
 transport input ssh
 exec-timeout 10 0`,
    },
  },
  {
    id: 'onboarding',
    no: '04',
    slug: 'AUTOMATISERING',
    title: 'Onboarding in één commando',
    lede: 'Drieëntwintig klikken die altijd hetzelfde zijn, zijn geen werk. Dat is een script dat nog niet bestaat.',
    period: '2026',
    stack: ['PowerShell 7', 'Microsoft Graph', 'Entra ID', 'Intune'],
    context:
      'Een nieuwe gebruiker aanmaken in mijn testtenant deed ik eerst met de hand: account in Entra, licentie toekennen, in vier groepen zetten, postbus controleren, toestel taggen voor Intune.',
    problem:
      'Ik heb het proces één keer uitgeschreven en kwam op 23 handmatige stappen verdeeld over drie portals. Het duurde ongeveer 25 minuten en ik vergat structureel dezelfde twee dingen: de gebruiker in de juiste licentiegroep zetten, en het toestel taggen zodat de juiste compliance-policy aansloeg.',
    approach: [
      'De 23 stappen op papier gezet en gegroepeerd. Wat altijd hetzelfde is, kan een script doen. Wat per persoon verschilt, komt uit een CSV met vier kolommen.',
      'Een app-registratie met alleen de rechten die het script nodig heeft — geen Global Admin, wel User.ReadWrite.All en Group.ReadWrite.All.',
      'Validatie vóór de eerste schrijfactie: bestaat de UPN al, klopt de afdeling, is er een licentie vrij? Het script stopt liever dan half werk af te leveren.',
      'Elke actie loggt naar een transcript en het script mailt een samenvatting. Als er iets misgaat, wil je weten bij welke gebruiker en bij welke stap.',
    ],
    result:
      'Een nieuwe gebruiker staat nu in ongeveer 40 seconden volledig klaar in plaats van 25 minuten. De twee stappen die ik altijd vergat, kan het script niet vergeten.',
    metrics: [
      { value: '23', unit: '→ 1', label: 'handmatige stappen geautomatiseerd' },
      { value: '40', unit: 'sec', label: 'per gebruiker, was 25 minuten' },
      { value: '3', unit: '→ 0', label: 'portals waar je nog in moet klikken' },
    ],
    components: [
      'starters.csv — UPN, weergavenaam, afdeling, manager',
      'Validatie — dubbele UPN, afdeling, vrije licentie',
      'New-Starter.ps1 — PowerShell 7',
      'App-registratie — least privilege, certificaat-auth',
      'Microsoft Graph — /users /subscribedSkus /groups',
      'Resultaat: account · licentie · groepen · Intune-tag',
      'Transcript + samenvatting per mail',
    ],
    diagramAlt:
      'Pijplijndiagram: een CSV gaat door een validatiestap naar een PowerShell-script dat via Microsoft Graph een account, licentie, groepslidmaatschappen en een Intune-tag aanmaakt, met logging en een mailrapport als sluitstuk.',
    code: {
      label: 'Onboarding — account, licentie, groepen',
      lang: 'powershell',
      filename: 'New-Starter.ps1',
      source: `<#
    Maakt een starter aan op basis van starters.csv.
    Valideert eerst alles; schrijft pas daarna.
#>
[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)] [string] $CsvPath,
    [string] $LicenseSku = 'ENTERPRISEPACK'
)

Start-Transcript -Path ".\\logs\\starters-$(Get-Date -f yyyyMMdd-HHmm).log"

Connect-MgGraph -Scopes 'User.ReadWrite.All', 'Group.ReadWrite.All',
                        'Organization.Read.All' -NoWelcome

$sku = Get-MgSubscribedSku | Where-Object SkuPartNumber -eq $LicenseSku
$vrij = $sku.PrepaidUnits.Enabled - $sku.ConsumedUnits
$rijen = Import-Csv -Path $CsvPath

if ($rijen.Count -gt $vrij) {
    throw "Onvoldoende licenties: $vrij vrij, $($rijen.Count) nodig."
}

$resultaat = foreach ($r in $rijen) {

    if (Get-MgUser -Filter "userPrincipalName eq '$($r.Upn)'" -ErrorAction SilentlyContinue) {
        Write-Warning "$($r.Upn) bestaat al - overgeslagen"
        continue
    }

    $wachtwoord = @{
        password                      = [guid]::NewGuid().ToString('N').Substring(0, 16) + '!aA1'
        forceChangePasswordNextSignIn = $true
    }

    if ($PSCmdlet.ShouldProcess($r.Upn, 'Account aanmaken')) {

        $user = New-MgUser -UserPrincipalName $r.Upn \`
                           -DisplayName       $r.Naam \`
                           -MailNickname      ($r.Upn -split '@')[0] \`
                           -Department        $r.Afdeling \`
                           -UsageLocation     'BE' \`
                           -AccountEnabled \`
                           -PasswordProfile   $wachtwoord

        Set-MgUserLicense -UserId $user.Id \`
                          -AddLicenses @(@{ SkuId = $sku.SkuId }) \`
                          -RemoveLicenses @()

        # Groepen volgen de afdeling: dit was stap 9 t/m 12 met de hand.
        $groepen = @("GRP-ALL-STAFF", "GRP-$($r.Afdeling)", 'GRP-INTUNE-AUTOPILOT')

        foreach ($g in $groepen) {
            $groep = Get-MgGroup -Filter "displayName eq '$g'"
            if (-not $groep) { Write-Warning "Groep $g ontbreekt"; continue }
            New-MgGroupMember -GroupId $groep.Id -DirectoryObjectId $user.Id
        }

        [pscustomobject]@{
            Naam     = $r.Naam
            Upn      = $r.Upn
            Licentie = $LicenseSku
            Groepen  = $groepen.Count
            Status   = 'OK'
        }
    }
}

$resultaat | Format-Table -AutoSize
$resultaat | Export-Csv '.\\logs\\laatste-run.csv' -NoTypeInformation -Encoding UTF8

Stop-Transcript`,
    },
  },
];

export interface Certification {
  id: string;
  code: string;
  name: string;
  vendor: string;
  year: string;
  state: 'done' | 'active' | 'planned';
  stateLabel: string;
  note: string;
}

export const CERTS = {
  index: '03',
  title: 'Traject',
  lead: 'Wat behaald is, staat vast. Wat loopt, loopt zichtbaar.',
  legend: [
    { state: 'done' as const, label: 'BEHAALD' },
    { state: 'active' as const, label: 'LOPEND' },
  ],
  items: [
    {
      id: 'ms900',
      code: 'MS-900',
      name: 'Microsoft 365 Fundamentals',
      vendor: 'Microsoft',
      year: '2025',
      state: 'done',
      stateLabel: 'BEHAALD',
      note: 'De basis van de tenant: licenties, diensten, servicemodellen.',
    },
    {
      id: 'az900',
      code: 'AZ-900',
      name: 'Azure Fundamentals',
      vendor: 'Microsoft',
      year: '2026',
      state: 'active',
      stateLabel: 'LOPEND',
      note: 'Examen gepland. Focus op identity, governance en kostenmodellen.',
    },
    {
      id: 'md102',
      code: 'MD-102',
      name: 'Endpoint Administrator',
      vendor: 'Microsoft',
      year: '2026',
      state: 'active',
      stateLabel: 'LOPEND',
      note: 'Sluit direct aan op het Intune- en Autopilot-werk uit case 02.',
    },
    {
      id: 'ccna',
      code: 'CCNA 200-301',
      name: 'Cisco Certified Network Associate',
      vendor: 'Cisco',
      year: '2027',
      state: 'active',
      stateLabel: 'LOPEND',
      note: 'Het langste traject. Routing, switching en security fundamentals.',
    },
  ] as Certification[],
  education: [
    {
      school: 'HOGENT',
      degree: 'Graduaat Systeem- en Netwerkbeheer',
      period: '2025 — 2027',
      note: 'Enterprise-netwerken, serverbeheer en cloudinfrastructuur.',
    },
    {
      school: 'VISO Gent',
      degree: 'TSO Intermedia / Multimedia',
      period: '2018 — 2024',
      note: 'Secundair diploma behaald.',
    },
  ],
} as const;

export const WORK = {
  index: '02',
  title: 'Werk',
  lead: 'Vier projecten uit eigen beheer. Geen opdrachten van een klant — wel echte machines, echte fouten en cijfers die kloppen.',
} as const;

export const CONTACT = {
  index: '04',
  title: 'Contact',
  headline: ['Laten we', 'praten.'],
  lead: 'Ik zoek een stageplaats vanaf februari 2027, in een omgeving waar ik aan echte infrastructuur mag komen. Liefst Microsoft-georiënteerd, maar ik leer graag iets anders.',
  emailLabel: 'STUUR EEN MAIL',
  links: [
    { label: 'LinkedIn', handle: 'mehdi-oulad-khlie', href: PERSON.linkedin },
    { label: 'GitHub', handle: 'yyyutakaaa', href: PERSON.github },
  ],
  colophon: {
    updated: '12.08.2026',
    built: 'React 18 · TypeScript · Vite · inline SVG',
    fonts: 'Inter Tight · JetBrains Mono',
    /**
     * Echt gemeten op de productiebuild met Lighthouse, mobiele preset
     * (4x CPU-throttling, traag 4G). Desktop haalt 100 op alle vier.
     */
    lighthouseLabel: 'LIGHTHOUSE (MOBIEL)',
    lighthouse: { performance: 99, accessibility: 100, bestPractices: 100, seo: 100 },
  },
} as const;

export const NAV_ITEMS = [
  { id: 'systeem', label: 'SYSTEEM', no: '01' },
  { id: 'werk', label: 'WERK', no: '02' },
  { id: 'traject', label: 'TRAJECT', no: '03' },
  { id: 'contact', label: 'CONTACT', no: '04' },
] as const;
