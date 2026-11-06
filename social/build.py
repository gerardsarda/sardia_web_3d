T = {
 'ca': dict(lang='ca', kicker='Consultoria d’IA i dades', h1='La IA que resol el dia a dia del teu', h1b='negoci.',
   sub='Per a pimes i autònoms.', serv='QUÈ FEM', place='Valls',
   s=['Automatització','Quadres de dades','CRM i ERP a mida','Previsió de vendes','Formació en IA','Pàgines web'], foot='Comença petit. Un sol procés.'),
 'es': dict(lang='es', kicker='Consultoría de IA y datos', h1='La IA que resuelve el día a día de tu', h1b='negocio.',
   sub='Para pymes y autónomos.', serv='QUÉ HACEMOS', place='Valls',
   s=['Automatización','Cuadros de datos','CRM y ERP a medida','Previsión de ventas','Formación en IA','Páginas web'], foot='Empieza pequeño. Un solo proceso.'),
}
icons = [
 '<circle cx="12" cy="12" r="5"/><circle cx="36" cy="36" r="5"/><path d="M17 12h10a6 6 0 0 1 6 6v13"/><path d="M29 27l4 4 4-4"/>',
 '<path d="M8 40V24M20 40V12M32 40V28M44 40V18"/><path d="M4 40h44"/>',
 '<circle cx="18" cy="16" r="6"/><path d="M6 40c0-8 5-13 12-13s12 5 12 13"/><circle cx="35" cy="19" r="4"/><path d="M34 28c6 0 10 4 10 11"/>',
 '<path d="M5 36l12-12 8 7 16-19"/><path d="M32 12h9v9"/>',
 '<path d="M24 8 4 18l20 10 20-10z"/><path d="M12 24v10c0 4 6 8 12 8s12-4 12-8V24"/><path d="M44 18v14"/>',
 '<rect x="5" y="9" width="38" height="30" rx="4"/><path d="M5 18h38"/><circle cx="11" cy="13.5" r="1"/><circle cx="16" cy="13.5" r="1"/>',
]
tpl = open('tpl.html',encoding='utf8').read()
for k,t in T.items():
    cards=''.join(f'<div class="card"><svg viewBox="0 0 48 48" class="ic">{icons[i]}</svg><span>{n}</span></div>' for i,n in enumerate(t['s']))
    h=tpl
    for key,val in t.items():
        if isinstance(val,str): h=h.replace('{{'+key+'}}',val)
    h=h.replace('{{cards}}',cards)
    open(f'sardia_infografia_{k}.html','w',encoding='utf8').write(h)
